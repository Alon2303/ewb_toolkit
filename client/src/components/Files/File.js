import React, {useState} from 'react'
import { makeStyles } from '@mui/styles';
import DescriptionSharpIcon from '@mui/icons-material/DescriptionSharp';
import './File.css'
import axios from 'axios';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const useStyles = makeStyles({
    root: {
        maxWidth: 310,
        transition: "transform 0.15s ease-in-out"
    },
    cardHovered: {
        transform: "scale3d(1.05, 1.05, 1)"
    }
});

const LINE_LEN = 9;
export default function File(props) {
    const classes = useStyles();
    const [state, setState] = useState({
    raised:false,
    shadow:1,
})
    console.log(props);

    const selected = props.selected;

    const getName = (name) => {
        // console.log(name);
        if (name.length <=LINE_LEN){
            return name;
        }
        else if (name.length > LINE_LEN && name.length < 25 ){
            return name.substring(0,LINE_LEN)+'...\n'+name.substring(name.length-(name.length-LINE_LEN));
        } 
        else{
            return name.substring(0,LINE_LEN)+'...\n'+name.substring(name.length-LINE_LEN);
        } 
    }

    const shortName = props.filename ? getName(props.filename.substring(props.currentFolder.length)) : '' ;
    const handleClick = async(event) =>{
        if (event.detail >= 2){
            console.log(props.filename);    
            var url = await axios.get(`http://localhost:3501/${props.filename.replaceAll('/','%2F')}`);
            console.log(url.data);
            props.resetSelection(props.filename);

            const ref = window.URL.createObjectURL(new Blob([url.data]));
            const link = document.createElement('a');
            link.href = ref;
            link.setAttribute('download', props.filename.substring(props.currentFolder.length));
            document.body.appendChild(link);
            link.click();

            return;    
        }
        else if (event.detail === 1){
            props.selectFile(props.filename, event.ctrlKey);
            return;
        }
    }

    const openContextMenu = event => {
        event.preventDefault();
        console.log('context');
    }

    return (
    <Card sx={{ fontSize: 16 }} className={classes.root} 
    classes={{root: state.raised ? classes.cardHovered : ""}}
    onMouseOver={()=>setState({ raised: true, shadow:3})} 
    onMouseOut={()=>setState({ raised:false, shadow:1 })} 
    raised={state.raised} zdepth={state.shadow}>
    <CardContent>
        <DescriptionSharpIcon sx={{ fontSize: 120 }} color="primary" />
        <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
        {props.filename}
        </Typography>
    </CardContent>
    <CardActions>
        <Button size="small">Preview</Button>
        <Button size="small">Download</Button>
        <Button size="small">Delete</Button>
    </CardActions>
    </Card>
    )
}
