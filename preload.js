const fs = require('fs');

function loadWebhooks() {
  var leftMenu = document.querySelector("#left-menu");

  if (leftMenu.childElementCount > 0) {
    while (leftMenu.firstChild) {
      leftMenu.removeChild(leftMenu.lastChild);
    }
  }

  fs.readFile('webhooks-stack.json', 'utf-8', (err, data) => {
    var list = JSON.parse(data);

    list.forEach(webhook => {

      var img = document.createElement("img");
      img.setAttribute("src", webhook.pp);
      img.setAttribute("alt", "webhook profile picture");
      img.setAttribute("class", "pp-webhook rounded-circle");

      var divImg = document.createElement("div");
      divImg.setAttribute("class", "col-2");
      divImg.appendChild(img);

      var nameSpan = document.createElement("span");
      nameSpan.innerHTML = webhook.name;

      var name = document.createElement("div");
      name.setAttribute("class", "col user-select-none text-cut");
      name.appendChild(nameSpan);

      var divItem = document.createElement("div");
      divItem.setAttribute("class", "row align-items-start");
      divItem.appendChild(divImg);
      divItem.appendChild(name);

      var a = document.createElement("a");
      a.setAttribute("class", "nav-link link-light");
      a.setAttribute("aria-current", "page");
      a.setAttribute("id", `item${webhook.id}`);
      a.appendChild(divItem);
      a.onclick = () => {
        var itemSelected = a.id;
        var oldItem = document.querySelector(".active");
        var newItem = document.querySelector(`#${itemSelected}`);

        oldItem.setAttribute("class", "nav-link link-light");
        newItem.setAttribute("class", "nav-link active");
      }

      a.onmouseover = () => {
        var width = a.querySelector("span").getBoundingClientRect().width;
        if (width > 175) {

        }
      }

      var li = document.createElement("li");
      li.setAttribute("class", "nav-item");
      li.appendChild(a);

      leftMenu.appendChild(li);
    });
    leftMenu.firstElementChild.querySelector("a").setAttribute("class", "nav-link active");
  });
}

window.addEventListener('DOMContentLoaded', () => {
  const body = document.querySelector("body");

  var form = document.querySelector("form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    function errMsg(text) {
      var zone = document.getElementById('errMsg');

      if (zone.childElementCount > 0) {
        while (zone.firstChild) {
          zone.removeChild(zone.lastChild);
        }
      }

      var button = document.createElement("button");
      button.setAttribute("type", "button");
      button.setAttribute("class", "btn-close");
      button.setAttribute("data-bs-dismiss", "alert");
      button.setAttribute("aria-label", "Close");

      var textAlert = document.createElement("div");
      textAlert.setAttribute("class", "alert alert-danger alert-dismissible fade show mt-3");
      textAlert.setAttribute("role", "alert");
      textAlert.innerHTML = text;
      textAlert.appendChild(button);

      zone.appendChild(textAlert);
    }

    if (form.URL.value) {
      const webhook = form.URL.value;
      fetch(webhook).then(res => res.json()).then(json => {
        if(json.type && json.id && json.name && json.channel_id && json.guild_id && json.token){
          fs.readFile('webhooks-stack.json', 'utf-8', (err, data) => {
            if (err) console.error(err);

            var list = JSON.parse(data);

            if (!list.find(webhook => webhook.id === json.id)) {
              var webhookProfil = {
                id: json.id,
                name: json.name,
                pp: json.avatar!==null?`https://cdn.discordapp.com/avatars/${json.id}/${json.avatar}.png`:"https://discord.com/assets/1f0bfc0865d324c2587920a7d80c609b.png",
                url: webhook
              }
              list.push(webhookProfil);
              var result = JSON.stringify(list);

              fs.writeFile('webhooks-stack.json', result, 'utf-8', ()=>{});
              if (body.id === "starter") {
                document.location.href = "manager.html";
              } else if (body.id === "manager") {
                loadWebhooks();
              }
            } else {
              errMsg("This webhook already exist.");
            }
          });
        } else {
          errMsg("You have to paste a valid webhook URL.");
        }
      }).catch(() => {
        errMsg("You have to paste the webhook URL.");
      });
    }
  });


  if (body.id === "manager") {

    loadWebhooks();

  }
});
