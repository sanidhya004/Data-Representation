import React from "react";
import { useState, useEffect } from "react";
import { ComposableMap } from "react-simple-maps";
import { Geographies } from "react-simple-maps";
import { Geography } from "react-simple-maps";
import { Annotation } from "react-simple-maps";
import { ZoomableGroup } from "react-simple-maps";
import { Sphere } from "react-simple-maps";
import { Graticule } from "react-simple-maps";
import { scaleLinear } from "d3-scale";
import { Marker } from "react-simple-maps";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { AssistWalkerTwoTone } from "@mui/icons-material";

const geourl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";
const colorScale = scaleLinear()
  .domain([0, 1000])
  .range(["#7CB9E8", "#00308F"]);
const Map = () => {
  const [countries, setCountries] = useState([]);
  const[name,setName]=useState('');
  const [position, Setposition] = useState({ coordinates: [0, 0], zoom: 2 });
  const[Data,setData]=useState({})

  const getData = () => {
    fetch("http://localhost:3001/countries")
      .then((res) => res.json())
      .then((data) => setCountries(data));
     
  };
  useEffect(function () {
    getData();
  }, []);

  const handleDrawer=()=>{
  
     handleClickOpen()
      
  }
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleMarker=()=>{
    return countries.map((item)=>{
       
        if(item.data<300){
          return( <Marker  key={item.id} coordinates={item.coordinates}>
            <circle r={15} fill="rgba(77, 193, 21, 0.61)"   onMouseEnter={()=>{setData(item) }} onClick={handleDrawer}/>
          </Marker>)
        }
        if(item.data>300 && item.data<400){
          return( <Marker  key={item.id} coordinates={item.coordinates}  onMouseEnter={()=>{setData(item) }} onClick={handleDrawer}>
            <circle r={20} fill="rgba(193, 180, 21, 0.61)" />
          </Marker>)
        }
        if(item.data>=400){
          return( <Marker  key={item.id} coordinates={item.coordinates}  onMouseEnter={()=>{setData(item) }} onClick={handleDrawer}>
            <circle r={23} fill="rgba(193, 26, 21, 0.61)"  />
          </Marker>)
        }
        
      })
  }
  const handleMove = (position) => {
    Setposition(position);
  };
 
  return (
    <>
     <div>
     
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        
      >
        
        <DialogContent>
          <DialogContentText id="alert-dialog-description" style={{width:'100%',height:'100%'}}>
              <h3>Region Name : {Data.Name}</h3>
              <br/>
              <h3>Data Usage : {Data.data}</h3>
              
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          
          <Button onClick={handleClose} autoFocus>
            <ArrowBackIcon/>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
      <div>
        <ComposableMap
          
          style={{}}
          projectionConfig={{
            rotate: [-10, 0, 0],
            scale: 150,
            
          }}
        >
          {countries.length > 0 ? (
            <ZoomableGroup
              zoom={position.zoom}
              center={position.coordinates}
              onMoveEnd={handleMove}
            >
            
              <Geographies geography="/features.json">
                {({ geographies }) =>
                  geographies.map((geo,index) => {
                    const isos=countries.find((s)=>s.region==geo.id)
                  return(<Geography key={index} geography={geo}
                    fill='#C0C0C0' />)
                   })
                }
              </Geographies>

              {handleMarker()}
            </ZoomableGroup>
          ) : (
            <p>loading..</p>
          )}
         
        </ComposableMap>
      </div>
    </>
  );
};

export default Map;
