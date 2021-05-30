package com.TicketsAppServer.repositories;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.TicketsAppServer.beans.Ticket;

public interface TicketRepository extends CrudRepository<Ticket, Integer> {
	@Query(value = "SELECT user_id FROM users_tickets WHERE tickets_id =:ticketId  ", nativeQuery= true)
	int findUserByTicket(int ticketId);
}
