package com.chatApp.ChatApp;



public class ChatMessage {

	
	private String sender;
	private String receiver;
	private String content;
	private String messageType;
	private int Id;
	 public enum MessageType {
	        CHAT,
	        JOIN,
	        LEAVE
	    }

	public String getSender() {
		return sender;
	}

	public void setSender(String sender) {
		this.sender = sender;
	}

	public String getReceiver() {
		return receiver;
	}

	public void setReceiver(String receiver) {
		this.receiver = receiver;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getMessageType() {
		return messageType;
	}

	public void setMessageType(String messageType) {
		this.messageType = messageType;
	}

	public int getId() {
		return Id;
	}

	public void setId(int id) {
		Id = id;
	}
	
}
