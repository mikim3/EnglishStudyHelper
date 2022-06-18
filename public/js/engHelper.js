$(document).ready(() => {
  const socket = io();
  $("#chatForm").submit(() => {
    let text = $("#chat-input").val(),
      userName = $("#chat-user-name").val(),
      userId = $("#chat-user-id").val();
    socket.emit("message", {
      content: text,
      userName: userName,
      userId: userId
    });
    $("#chat-input").val("");
    return false;
  });

  socket.on("message", message => {
    displayMessage(message);
  });

  socket.on("load all messages", data => {
    data.forEach(message => {
      displayMessage(message);
    });
  });

  socket.on("message", message => {
    displayMessage(message);
    for (let i = 0; i < 2; i++) {
      $(".chat-icon")
        .fadeOut(200)
        .fadeIn(200);
    }
  });

  let displayMessage = message => {
    $("#chat").prepend(
      $("<li>").html(`
				<div class='message ${getCurrentUserClass(message.user)}'>
				<span class="user-name">
					${message.userName}:
				</span>
					${message.content}
				</div>
			`)
    );
  };

  let getCurrentUserClass = id => {
    let userId = $("#chat-user-id").val();
    if (userId === id) return "current-user";
    else return "";
  };
});

// 번역기 js
// 문장 : 선택
// 미완
let prevText = null;
let prevPopover = null;
$(".translate").click((e) => {

    let text = $(e.target).text();
    // $(e.target).outerHTML
    // $(e.target).append(text);

    let popcnt = $(".popover").length;
    if (popcnt == 1) {
        prevPopover.popover('dispose');
        $(".translate").removeClass('bg-dark text-white');
    }


    let currText = $(e.target).text();
    if (prevText != currText) {

        $.post('/translate', { text: text }, (res) => {
            $(e.target).addClass('bg-dark text-white');
            prevPopover = $(e.target).popover({
                content: res.text,
                placement: 'bottom'
            });
            prevPopover.popover('show');
            $(".popover-body").addClass('text-danger');
            prevText = currText;
        }, 'json');

    } else {
        $(".popover").hide();
        prevText = -1;
    }
});
