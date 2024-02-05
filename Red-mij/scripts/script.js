document.addEventListener('DOMContentLoaded', function () {
  const canvas = document.getElementById('map');
  const ctx = canvas.getContext('2d');
  const img = new Image();
  img.src = 'media/EersteVerdieping.jpeg'
  
  let foundRoomIndex = -1; 

  img.onload = function() {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0); 
    drawRooms(); 
  };

  //Lokalen, voeg meer toe wanneer nodig. Hier kun je ze ook aanpassen.
  const rooms = [
    { name: 'B119-21', x: 50, y: 360 },
    { name: 'B123', x: 140, y: 360 },
    { name: 'C125-27', x: 260, y: 360 },
    { name: 'C129-31', x: 360, y: 360 },
    { name: 'B130', x: 40, y: 325 },
    { name: 'B132', x: 140, y: 325 },
    { name: 'C134', x: 250, y: 325 },
    { name: 'C135', x: 650, y: 140 },
    { name: 'B136', x: 320, y: 325 },
    { name: 'C138', x: 400, y: 325 },
    { name: 'C139', x: 750, y: 325 },
    { name: 'Toiletten', x: 580, y: 325 },
    { name: 'C141', x: 820, y: 325 },
    { name: 'C143', x: 890, y: 325 },
    { name: 'C150', x: 520, y: 155 },
    { name: 'C152', x: 960, y: 325 },
    { name: 'C154', x: 1030, y: 325 },


    // Voeg meer kamers toe zoals nodig
  ];

  
  function drawRooms() {
    rooms.forEach((room, index) => {
      ctx.beginPath();
      ctx.arc(room.x, room.y, 5, 20, Math.PI * 2);
      if (index === foundRoomIndex) {
        ctx.fillStyle = 'pink'; //Markering wanneer het lokaal gevonden is
      } else {
        ctx.fillStyle = 'black'; 
      }
      ctx.fill();
		if (room.name === rooms) {
		ctx.font = 'bold 17px Arial'; 
    } else {
		ctx.font = 'bold 23px Arial'; 
    }
    ctx.fillText(room.name, room.x + 10, room.y);
  });
}

  //Het zoeken van kamers.

  function searchRoom() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const tolerance = 10;

    const foundRoom = rooms.find(room => {
      const roomName = room.name.toLowerCase();
      return roomName.includes(query) ||
        Math.abs(room.x - parseInt(query)) <= tolerance ||
        Math.abs(room.y - parseInt(query)) <= tolerance;
    });
    if (foundRoom) {
      foundRoomIndex = rooms.indexOf(foundRoom); 
      var melding = `Het lokaal "${foundRoom.name}" is gevonden.`;
    } else {
      foundRoomIndex = -1; 
      var melding = 'Lokaal niet gevonden.';
    }
    document.getElementById('melding').innerHTML = melding;
    redrawMap();  
  }

 
  function redrawMap() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    ctx.drawImage(img, 0, 0); 
    drawRooms();
  }

//Knopje om je lokaal te zoeken.
  document.getElementById('searchButton').addEventListener('click', searchRoom);
});