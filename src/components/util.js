function linestringize() {
  // Empire Builder
  // Empire Service
  // Lake Shore Limited
  // Maple Leaf
  // New Haven - Springfield pick up from here
  // San Joaquins
  // Silver_Service/Palmetto
  // Southwest Chief
  // Sunset Limited
  // DC - Norfolk
  // Kansas City - St. Louis (Missouri River Runner)

  // in the middle of texas eagle
  const r = data.features
    .filter(d => d.properties.NAME === "Sunset Limited")

  if (r[0].geometry.type === "LineString") {
    console.log(JSON.stringify(r[0]))
  } else {
    let p = r[0].geometry.coordinates
    // .filter(d => d.length > 10);

    p.forEach(d => {
      if (d[0][0] > d[d.length-1][0])
        d.reverse();
    })
    
    p.sort((a,b) => {
        return a[0][0] - b[0][0];
    })

    p = p.flat();

  r[0].geometry.type = "LineString";
  r[0].geometry.coordinates = p;

  projectedLine = r[0];

  console.log(JSON.stringify(r[0]))

  setRoutes([{ d: path(r[0]) }])
  }
}



        const r = data.features;
        let newRoutes = [];

        r.forEach(route => {
          let p = route.geometry.coordinates
          // .filter(d => d.length > 10);

          p.forEach(d => {
            if (d[0][0] > d[d.length-1][0])
              d.reverse();
          })
          
          p.sort((a,b) => {
              return a[0][0] - b[0][0];
          })

          p = p.flat();

        route.geometry.type = "LineString";
        route.geometry.coordinates = p;

        // projectedLine = r[0];

        newRoutes.push({ d: path(route) })
        })
          
        
        setRoutes(newRoutes)


        /* bad code below */

        // let routeArray = [];
        // let startCoords;
        
        


          // console.log(r[0].geometry.coordinates.map(c => c.length))
          // console.log(p)
          
        //   p.forEach(d => {

        //     // if (!startCoords || d[0][0] !== startCoords[0][0]) {
        //     //   // console.log(d[0][0], d[0][1])

        //     //   // console.log(d)
        //       const pathCoords = d.map(c => originalProjection(c).join(","))

        //       routeArray.push({
        //         d: `M${pathCoords.join(" ")}`,
        //         // id: d.properties.NAME,
        //       });
        //     // } else {

        //     //   console.log(startCoords.length, d.length)
        //     //   // console.log("hi")
        //     // }
        //     // startCoords = d;

        //     // const pathCoords = d.map(c => originalProjection(c).join(","))
        //     // routeArray.push({
        //     //     d: `M${pathCoords.join(" ")}`,
        //     //     // id: d.properties.NAME,
        //     //   });
            
        //   });

        // setRoutes(routeArray);

function splitByStation() {
  const sunset = data.features.filter(d => d.properties.NAME === "Sunset Limited")

  fetch(stationJSON).then(response => response.json())
    .then(stationData => {
      const bounds = d3.geoBounds(projectedLine);

      const staties = stationData.features
        .filter(d => d.properties.stntype === "TRAIN")
        .map(d => {

          const coords = d.geometry.coordinates.map(s => Number(s.toFixed(4)))
          // console.log(coords)
          return {
            coords: coords,
            point: originalProjection(d.geometry.coordinates),
            name: d.properties.stationnam
          }
        }).filter(d => {
          // console.log(d.coords, bounds)
          return d.coords[0] > bounds[0][0] &&
            d.coords[0] < bounds[1][0] &&
            d.coords[1] > bounds[0][1] &&
            d.coords[1] < bounds[1][1]
        }).sort((a,b) => a.coords[0] - b.coords[0]);

      let pieces = [];
      let stringy = projectedLine.geometry.coordinates
        .map(s => [Number(s[0].toFixed(4)), Number(s[1].toFixed(4))]);

      let routeBits = [];

      let routeStations = [];
      const margin = .03;
      staties.forEach(s => {
        // need to account for start and end stations

        const match = stringy.findIndex(t => {
          return t[0] > s.coords[0] - margin
          && t[0] < s.coords[0] + margin
          && t[1] > s.coords[1] - margin
          && t[1] < s.coords[1] + margin
        });
        if (match !== -1) {
          routeStations.push(s)

          routeBits.push({
            "type":"Feature",
            "geometry":{
              "type":"LineString",
              "coordinates": stringy.slice(0, match)
            }
          })

          stringy = stringy.slice(match);
        }
      })

      setRoutes(routeBits.map(d => ({ d: path(d) })));

      setStations(routeStations);
    })
}

function showStationAlongRoute() {
  const sunset = data.features.filter(d => d.properties.NAME === "Southwest Chief")[0]
        const bounds = d3.geoBounds(sunset);

        fetch(stationJSON).then(response => response.json())
          .then(stationData => {
            const routeStations = stationData.features
              .filter(d => d.properties.stntype === "TRAIN")
              .map(d => {

              const coords = d.geometry.coordinates.map(s => Number(s.toFixed(4)))
              return {
                coords: coords,
                point: originalProjection(d.geometry.coordinates),
                name: d.properties.stationnam
              }
            }).filter(d => {
              return d.coords[0] > bounds[0][0] &&
                d.coords[0] < bounds[1][0] &&
                d.coords[1] > bounds[0][1] &&
                d.coords[1] < bounds[1][1]
            }).sort((a,b) => a.coords[0] - b.coords[0]);

            let showStations = [];
            const margin = .04;
            routeStations.forEach(s => {
              // need to account for start and end stations

              let match = false;

              sunset.geometry.coordinates.forEach(coords => {
                const m = coords.findIndex(t => {
                  return t[0] > s.coords[0] - margin
                  && t[0] < s.coords[0] + margin
                  && t[1] > s.coords[1] - margin
                  && t[1] < s.coords[1] + margin
                });
                if (m !== -1 && showStations.findIndex(station => station.name === s.name) === -1)
                  showStations.push(s)
              })
            })

            setStations(showStations);
          })
}
