'use strict';

var username=null;
var StompClient=null;
var icon=1;
$(".chat-history").css("height",($(window).height()+144)+"px");
  $(".loginform").on("submit", function (e) {
	console.log(e);
    e.preventDefault();
	let socket = new SockJS('/ws');
	 StompClient = Stomp.over(socket);
    StompClient.connect({}, (fram) => {
        console.log("connected");
        StompClient.subscribe('/topic/public', (data) => {
            var res = JSON.parse(data.body);
            console.log(res.messageType)
            if (res.messageType === "JOIN") {
                var chatmember = `
					             	<li class="clearfix">
						                        <img src="https://bootdey.com/img/Content/avatar/avatar${res.id}.png" alt="avatar">
						                        <div class="about">
						                            <div class="name">${res.sender}</div>
						                            <div class="status"> <i class="fa fa-circle online"></i> online </div>
						                        </div>
						                    </li>`;

                $(".chat-list").append(chatmember);
                $(".login").hide();
                $(".chatpage").show();
            } else if (res.type == "CHAT") {
				const now = new Date();
                var chat = `<li class="clearfix ${res.sender.trim()}">
									 <div class="message-data ">
									          <div class="name-date">
										       <span class="message-data-time ">${res.sender}</span>
											   <span class="message-data-time ">${formatTime(now)}</span>
											  </div>
											  <img src="https://bootdey.com/img/Content/avatar/avatar${res.id}.png" alt="avatar">
								      </div>
							   <div class="message my-message">${res.content}</div>                                    
						   </li>`;

                $(".chat-history ul").append(chat);
				$("."+username).css({
					    display: "flex",
					    flexDirection: "column",
					    justifyContent: "flex-end",
					    alignItems: "flex-end"
					});
				  $(".chat-history").animate({ scrollTop:  $(".chat-history")[0].scrollHeight }, 500); 
				  
            };
        })

        if (StompClient) {
			username= $("#uname").val();
		    icon = Math.floor(Math.random() * 8);
			icon = icon === 0 ? 1 : icon;

			console.log(icon)
            StompClient.send("/app/chat.addUser", {}, JSON.stringify({
                sender: $("#uname").val(),
                messageType: "JOIN",
				id:icon,
            }));
        }
    }, (err) => {
        console.log(err);
    })
});

function handleSubmit(e) {
    e.preventDefault();
    
    var chatmsg = {
        sender:username,
        type: "CHAT",
        content: e.target[1].value,
		id:icon,
    }
	
    StompClient.send("/app/chat.sendMessage", {}, JSON.stringify(chatmsg));
	e.target[1].value="";

}



// Function to add leading zero for minutes less than 10
function formatTime(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';

    // Convert 24-hour time to 12-hour time format
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;

    return hours + ':' + minutes + ' ' + ampm;
}