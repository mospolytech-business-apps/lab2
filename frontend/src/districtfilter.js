export default function filterInsideArea(area, realEstateList) {
    const points = area.area.split(',').map(str => {
      const [lat, lon] = str.trim().slice(1, -1).split(',');
      return {lat, lon}; 
    });
  
    return realEstateList.filter(item => {
      const x = item.Coordinate_latitude;
      const y = item.Coordinate_longitude;
      
      let inside = false;
      for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
        const xi = points[i].lat, yi = points[i].lon;
        const xj = points[j].lat, yj = points[j].lon;
        console.log(xi, xj)

        
        const intersect = ((yi > y) != (yj > y))
          && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);

        if (intersect) inside = !inside;
      }
      
      return inside;

    });
  }
