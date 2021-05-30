package com.TicketsAppServer.services;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.TicketsAppServer.JwtServices;
import com.TicketsAppServer.beans.Ticket;
import com.TicketsAppServer.beans.User;
import com.TicketsAppServer.repositories.TicketRepository;
import com.TicketsAppServer.repositories.UserRepository;

import lombok.Synchronized;

import static encryption.RC6.rc6Decrypt;
import static encryption.RC6.rc6Encrypt;
import static encryption.RSA.*;

@Service
public class TicketService {
	@Autowired
	TicketRepository ticketRepository;

	@Autowired
	UserRepository userRepository;

	@Autowired
	JwtServices JwtServices;

	/**
	 * create ticket by given ticket's data
	 * 
	 * @param ticket - data that coming from client
	 * @return ticket's data
	 * @throws Exception 
	 */
	@Synchronized
	public Ticket create(int userId, Ticket ticket) throws Exception {
		User user = userRepository.findById(userId).get();
		
		String rc6EncryptedText = rc6Encrypt(ticket.getBody(), user.getPassword());
		ticket.setBody(rc6EncryptedText);
		
		ticket.setSender(user.getEmail());
		ticket.setCategory(1);
		
		user.getTickets().add(ticket);
		User savedUser = userRepository.save(user);

		List<Ticket> tickets = savedUser.getTickets();

		return tickets.get(tickets.size() - 1);
	}

	/**
	 * update the ticket with the given data
	 * 
	 * @param ticket - the new ticket to update
	 * @return ticket status
	 * @throws Exception if the ticket not found
	 */
	public Ticket update(Ticket ticket, int ticketId) throws Exception {
		Optional<Ticket> opTicket = ticketRepository.findById(ticketId);
		if (opTicket.isEmpty())
			throw new Exception("ticket not found");

		Ticket originTicket = opTicket.get();
		originTicket.setTitle(ticket.getTitle());
		
		int userId = ticketRepository.findUserByTicket(ticketId);
		User user = userRepository.findById(userId).get();;
		String rc6EncryptedText = rc6Encrypt(ticket.getBody(), user.getPassword());
		originTicket.setBody(rc6EncryptedText);	
		
		originTicket.setPriority(ticket.getPriority());
		originTicket.setRead(ticket.isRead());
		originTicket.setColor(ticket.getColor());
		originTicket.setIcon(ticket.getIcon());
		originTicket.setSender(user.getEmail());
		originTicket.setCategory(1);
		ticketRepository.save(originTicket);
		return originTicket;
	}

	/**
	 * delete the given ticket using user's id and ticket's id
	 * 
	 * @param userId
	 * @param ticketId
	 * @return ticket status
	 * @throws Exception if the ticket not found
	 */
	public Ticket delete(int userId, int ticketId) throws Exception {
		User user = userRepository.findById(userId).get();
		List<Ticket> tickets = user.getTickets();

		for (Ticket ticket : tickets) {
			if (ticket.getId() == ticketId) {
				tickets.remove(ticket);
				ticketRepository.deleteById(ticketId);
				userRepository.save(user);
				Map<String, String> result = new HashMap<>();
				result.put("ticketId", String.valueOf(ticketId));
				result.put("status", "deleted");
				return ticket;
			}
		}
		throw new Exception("ticket not found");

	}


	/**
	 * get all the user's tickets
	 * 
	 * @param userId
	 * @return list of all the user's tickets
	 */
	public List<Ticket> getTickets(int userId) {
		User user = userRepository.findById(userId).get();
		
		List<Ticket> tickets = user.getUserTickets();
//		List<Ticket> tickets = user.getTickets();
		
		String rc6DecryptedText = "";
		
		for(int i=0; i<tickets.size();i++)
		{
			Ticket t = tickets.get(i);
			try {
				rc6DecryptedText = rc6Decrypt(t.getBody(), user.getPassword());
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			t.setBody(rc6DecryptedText);
			tickets.set(i, t);
		}
		
		return tickets;
		
		
		
	//	return user.getTickets();
	}

	
	/**
	 * get all the user's tickets
	 * 
	 * @param userId
	 * @return list of all the user's tickets
	 * @throws Exception
	 */
	public Ticket getTicket(int userId, int ticketId) throws Exception {
		User user = userRepository.findById(userId).get();
		List<Ticket> tickets = user.getTickets();
		
		String rc6DecryptedText = "";
		
		for (Ticket t : tickets) {
			if (t.getId() == ticketId)
				rc6DecryptedText = rc6Decrypt(t.getBody(), user.getPassword());
				t.setBody(rc6DecryptedText);
				return t;
		}

		throw new Exception("ticket not found");
	}
	
	
	
	public Ticket sendTicket(int userId, Ticket ticket, String reciverEmail, String publicKeyAsString) throws Exception {
		User sender = userRepository.findById(userId).get();
		
		String encryptedRsaText = rsaEncrypt(ticket.getBody(), getPublicKey(publicKeyAsString));
		ticket.setBody(encryptedRsaText);

		ticket.setCategory(2);
		ticket.setSender(sender.getEmail());
		User reciver = userRepository.findByEmail(reciverEmail);
		reciver.getTickets().add(ticket);
		User savedUser = userRepository.save(reciver);

		List<Ticket> tickets = savedUser.getTickets();

		return tickets.get(tickets.size() - 1);
	}
	
	public Ticket reciveTicket(int userId, int ticketId, String privateKeyAsString) throws Exception {
		User user = userRepository.findById(userId).get();
		List<Ticket> tickets = user.getTickets();
		
		String decryptedRsaText = "";
		
		for (Ticket t : tickets) {
			if (t.getId() == ticketId)
				decryptedRsaText = rsaDecrypt(t.getBody(), getPrivateKey(privateKeyAsString)) ;
				t.setBody(decryptedRsaText);
				return t;
		}

		throw new Exception("ticket not found");
	}
	
	public List<Ticket> reciveTickets(int userId, String privateKeyAsString) {
		User user = userRepository.findById(userId).get();
		
		List<Ticket> tickets = user.getSharedTickets();
//		List<Ticket> tickets = user.getTickets();
		
		String decryptedRsaText = "";
		
		for(int i=0; i<tickets.size();i++)
		{
			Ticket t = tickets.get(i);
			try {
				decryptedRsaText = rsaDecrypt(t.getBody(), getPrivateKey(privateKeyAsString)) ;
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			t.setBody(decryptedRsaText);
			tickets.set(i, t);
		}
		
		return tickets;
		
		
		
	//	return user.getTickets();
	}

}
