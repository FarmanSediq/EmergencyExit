document.addEventListener('DOMContentLoaded', function () {
  const canvas = document.getElementById('map');
  const ctx = canvas.getContext('2d');
  const img = new Image();
  img.src = 'media/TweedeVerdieping.jpeg';
  
  let foundRoomIndex = -1; 

  img.onload = function() {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0); 
    drawRooms(); 
  };

  const rooms = [
    { name: 'B219-21', x: 40, y: 150 },
    { name: 'B223', x: 143, y: 150 },
    { name: 'C225-27', x: 260, y: 150 },
    { name: 'C229-31', x: 360, y: 150 },
    { name: 'B230', x: 40, y: 110 },
    { name: 'B232', x: 140, y: 110 },
    { name: 'C234', x: 250, y: 110 },
    { name: 'C235', x: 650, y: 150 },
    { name: 'B236', x: 320, y: 110 },
    { name: 'C238', x: 400, y: 110 },
    { name: 'C239', x: 750, y: 150 },
    { name: 'Toiletten', x: 480, y: 105 },
    { name: 'C241', x: 850, y: 150 },
    { name: 'C243', x: 940, y: 150 },
    { name: 'C250', x: 620, y: 105 },
    { name: 'C252', x: 820, y: 105 },
    { name: 'C254', x: 920, y: 105 },



   




    // Voeg meer kamers toe zoals nodig
  ];

  
  function drawRooms() {
    rooms.forEach((room, index) => {
      ctx.beginPath();
      ctx.arc(room.x, room.y, 5, 20, Math.PI * 2);
      if (index === foundRoomIndex) {
        ctx.fillStyle = 'pink'; 
      } else {
        ctx.fillStyle = 'black'; 
      }
      ctx.fill();
		if (room.name === rooms) {
		ctx.font = 'bold 16px Arial'; 
    } else {
		ctx.font = 'bold 22px Arial'; 
    }
    ctx.fillText(room.name, room.x + 10, room.y);
  });
}

  
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


  document.getElementById('searchButton').addEventListener('click', searchRoom);
});