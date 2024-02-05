document.addEventListener('DOMContentLoaded', function () {
  const canvas = document.getElementById('map');
  const ctx = canvas.getContext('2d');
  const img = new Image();
  img.src = 'media/DerdeVerdieping.jpeg';
  
  let foundRoomIndex = -1; 

  img.onload = function() {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0); 
    drawRooms(); 
  };

  const rooms = [
    { name: 'B319-21', x: 40, y: 110 },
    { name: 'B323', x: 130, y: 75 },
    { name: 'C325-27', x: 260, y: 75 },
    { name: 'C329-31', x: 360, y: 75 },
    { name: 'B330', x: 40, y: 75 },
    { name: 'C332', x: 140, y: 110 },
    { name: 'C334', x: 250, y: 110 },
    { name: 'C335', x: 320, y: 110 },
    { name: 'B336', x: 420, y: 110 },
    { name: 'C338', x: 460, y: 75 },
    { name: 'C339', x: 750, y: 110 },
    { name: 'Toiletten', x: 580, y: 75 },
    { name: 'C341', x: 850, y: 110 },
    { name: 'C343', x: 940, y: 110 },
    { name: 'C350', x: 730, y: 75 },
    { name: 'C352', x: 820, y: 75 },
    { name: 'C354', x: 920, y: 75 },



   




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
		ctx.font = 'bold 21px Arial'; 
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