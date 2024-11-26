package com.chatApp.ChatApp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Controller;

import com.chatApp.ChatApp.*;


@Controller
public class ChatController {

	 @Autowired
	  private SimpMessagingTemplate simpMessagingTemplate;
	  
	  
    @MessageMapping("/chat.sendMessage")
    @SendTo("/topic/public")
    public String sendMessage(@Payload String chatMessage) {
    	
        return chatMessage;
    }
    
    @MessageMapping("/chat.addUser")
    @SendTo("/topic/public")
    public ChatMessage addUser(@Payload ChatMessage chatMessage, 
                               SimpMessageHeaderAccessor headerAccessor) {
    	System.out.println(chatMessage.getMessageType()+" "+chatMessage.getSender());
        headerAccessor.getSessionAttributes().put("username", ((ChatMessage) chatMessage).getSender());
        return chatMessage;
    }
    
    @MessageMapping("/chat.privateUser")
    @SendTo("/topic/private")
    public String privateUser(@Payload String chatMessage) {
    	
    	
		return chatMessage;
    	
    }
}
