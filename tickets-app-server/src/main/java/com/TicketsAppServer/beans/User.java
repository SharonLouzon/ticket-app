package com.TicketsAppServer.beans;

import static encryption.RC6.rc6Decrypt;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.springframework.context.annotation.Bean;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import static encryption.RC6.rc6Decrypt;
import static encryption.RC6.rc6Encrypt;
import static encryption.RSA.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name="users")
public class User {

	@Id
	@GeneratedValue
	private int id;
	private String firstName;
	private String lastName;
	private String email;
	private String password;
	@Column(name = "public_key", columnDefinition = "text")
	private String publicKey;
	
	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	private List<Ticket> tickets;
	
	
	public List<Ticket> getUserTickets(){
		List<Ticket> userTickets = this.getTickets();
		for(int i=0; i<tickets.size();i++)
		{
			if(userTickets.get(i).getCategory()==2)
			{
				userTickets.remove(i);
			}
		}
		
		return userTickets;
	}
	
	public List<Ticket> getSharedTickets(){		
		List<Ticket> sharedTickets = this.getTickets();
		for(int i=0; i<tickets.size();i++)
		{
			if(sharedTickets.get(i).getCategory()==1)
			{
				sharedTickets.remove(i);
			}
		}
		
		return sharedTickets;
	}
	/*
	public List<Ticket> getTickets(){
		String rc6DecryptedText = "";
		
		for(int i=0; i<tickets.size();i++)
		{
			Ticket t = tickets.get(i);
			try {
				rc6DecryptedText = rc6Decrypt(t.getBody(), this.getPassword());
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			t.setBody(rc6DecryptedText);
			tickets.set(i, t);
		}
		
		return this.tickets;
	}*/
	
	/*
	@Id
	@GeneratedValue
	public int getId() {
		return id;
	}

	
	public void setId(int id) {
		this.id = id;
	}

	@Bean
	@Column
	public String getFirstName() {
		return firstName;
	}


	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	@Bean
	@Column
	public String getLastName() {
		return lastName;
	}


	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	@Bean
	@Column
	public String getEmail() {
		return email;
	}


	public void setEmail(String email) {
		this.email = email;
	}

	@Bean
	@Column
	public String getPassword() {
		return password;
	}


	public void setPassword(String password) {
		this.password = password;
	}

	@Bean
	@Column
	public List<Ticket> getTickets() {
		return tickets;
	}


	public void setTickets(List<Ticket> tickets) {
		this.tickets = tickets;
	}

*/

}
