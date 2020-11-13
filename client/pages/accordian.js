import React, { useState } from 'react';
import { List } from 'rsuite'
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import axios from './api/axios'
const useStyles = makeStyles((theme) => ({
    root: {
        width: '700px',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
}));


export default function ControlledAccordions(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [expanded2, setExpanded2]= React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        console.log(event, isExpanded, panel)
        listUsers(panel)
        setExpanded(isExpanded ? panel : false);
    };
    const handleChange2 = (panel) => (event, isExpanded) => {
        console.log(event, isExpanded, panel)
        var x = panel.split('-')
        listMutual(x[0], x[1])
        setExpanded2(isExpanded ? panel : false);
    };
    const [count, setCount] = useState([]);
    const [mutual, setMutual] = useState([]);
    const listUsers = (p) => {

        axios.get('/api/v1/user/' + p, {})
            .then(r => {
                setCount(r.data.data)
            })
            .catch(err => {
                console.log(err)
            });
    }
    const listMutual = (userId, friendId) => {
        console.log(userId, friendId)
        axios.get(`/api/v1/user/${userId}/${friendId}`, {})
            .then(r => {
                setMutual(r.data.data)
            })
            .catch(err => {
                console.log(err)
            });
    }
    return (
        <div className={classes.root}>
            <h3>
                Users List
            </h3>
            {props.data.map((item, index) => (
                /*                        <List.Item key={index} index={index}>
                                           {item.firstName}
                                       </List.Item> */
                <Accordion expanded={expanded === item.id} onChange={handleChange(item.id)} style = {{ width:700 }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={"panel1bh-content" + item.id} id={"panel1bh-header" + item.id} >
                        <Typography className={classes.heading}>{item.firstName} {item.lastName}</Typography>
                        <Typography className={classes.secondaryHeading}>aka {item.avatar} </Typography>
                    </AccordionSummary>
                    <AccordionDetails>

                                {count && count.length ? count.map((r, i) =>

                                    // <Accordion  style = {{ width:700 }} expanded={expanded2 === `${item.id}-${r.id}`} onChange={handleChange2(`${item.id}-${r.id}`)}>
                                    //     <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={"panel1bh-content" + `${item.id}-${r.id}`} id={"panel1bh-header" + `${item.id}-${r.id}`} >
                                            <React.Fragment>
                                                
                                                <Typography className={classes.heading}>{i+1}</Typography>
                                                <Typography className={classes.heading}>{r.firstName} {r.lastName}</Typography>
                                                <Typography className={classes.secondaryHeading}>aka {r.avatar} </Typography>

                                            </React.Fragment>
                                    //     </AccordionSummary>
                                    //     <AccordionDetails>
                                    //     </AccordionDetails>
                                    // </Accordion>

                                ) : <li>No friend</li>}


                    </AccordionDetails>
                </Accordion>
            ))}



        </div>
    );
}