import React, { useContext, useState } from "react";
import Graph, { Edge } from "react-json-graph";
import axios from 'axios';

import JSONViewer from 'react-json-viewer';

import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';


import { createGraphiQLFetcher } from '@graphiql/toolkit';
import { GraphiQL } from 'graphiql';
import 'graphiql/graphiql.css';


import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';


import Accordion from '@mui/material/Accordion';
import Typography from '@mui/material/Typography';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';





const GrapgContext = React.createContext({});



export default function DataProv() {







const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: 'white',
    color: 'black',
    maxWidth: '100%',
    fontSize: theme.typography.pxToRem(10),
  },
}));

  const handleChange = (event) => {
    setText3(event.target.value);
  };

const Ltable = (jdata) => {
  if (typeof jdata != 'object') return jdata;

  const arrList = ['auth', 'datasets', 'datas', 'catalog', '__typename', 'group', '__pmdtype'];
  let countI = 1;
  return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small">
          <TableBody>

        {Object.keys(jdata).filter((jkey) => !arrList.includes(jkey)).map(v => (
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
          {v}
              </TableCell>

              <TableCell>
          {Ltable(jdata[v])}
              </TableCell>
            </TableRow>
        ))}

          </TableBody>
        </Table>
      </TableContainer>

  );
};



class CustomNode extends React.PureComponent {
  static contextType = GrapgContext;


  render() {
    const { id, x, y, width, height } = this.props;
    const { data, setData } = this.context;
    const node = data.nodes.find((node) => node.id == id);
    return (
      <HtmlTooltip
        title={
          <React.Fragment>
            {Ltable(node.data)}
          </React.Fragment>
        }
      >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "white",
          alignItems: "center",
          border: "1px solid",
          borderColor: "grey",
          borderRadius: 5,
          padding: "0 10px",
          position: "absolute",
          left: x,
          top: y,
          width: 150,
          height: 35,
          cursor: "pointer",
          transition: "left 300ms, top 300ms"
        }}
        onChange={(newGraphJSON) => setData(newGraphJSON)}
        onClick={() => {
          setExample(node.data);



        }}
      >
        <div>-</div>
        <div>{node.label}</div>
      </div>
      </HtmlTooltip> 
    );
  }
}






  const initial = {
    nodes: [],
    edges: [],
    isStatic: true,
    isVertical: true,
    isDirected: true,
    height: 100
  };
  
  
  const Viz = () => {
    const { data, setData } = useContext(GrapgContext);
    return (
      <div>
        <Graph
          width={1300}
          height={data.height}
          json={data}
          Node={CustomNode}
        />
      </div>
    );
  };




  const [text, setText] = useState("y.yokouchi@pebblecorp.co.jp");
  const [text2, setText2] = useState("");
  const [text3, setText3] = useState("");
  const [data, setData] = useState(initial);
  const [data2, setData2] = useState(initial);
  const [data3, setData3] = useState(initial);
  const [data4, setData4] = useState([]);
  const [token, setToken] = useState("9d2ad0e79acbfad52bea1c89ac71755170be5c7a9684d1ef45298386ec2470eb");
  const [example, setExample] = useState("");
  const [example2, setExample2] = useState("");
  const [ownData, setOwnData] = useState("");
  const [othData, setOthData] = useState("");
  const [jcol, setJcol] = useState("");
  async function doSomethingWithArg() {
    if (text3.length == 0) return;
      let headerTxt = '  export(category: "' + text3 + '") {';
      const bodyTxt = `
    pname
    datas {
      pname
      datas {
        pname
        schema {
          id
          jsonStr
        }
        metadata {
          id
          jsonStr
        }
        datas {
          pname
          datas {
            datafile_name
            file_id
            summary
          }
        }
      }
    }
  }
}
`;
      setJcol('{\n' + headerTxt + bodyTxt);
  }

  async function doXY2(label, __pmdtype) {
    if ('catalog' == __pmdtype) {
      await doXY();
    } else if ('dataset' == __pmdtype) {


      const res = await axios.get('http://172.23.67.87:5000/api/hdatas', {headers: {"Token":token}, data:{}});
      const addHeight = 200;
      if (res.data) {
        const rcatalog = res.data;
        let list = [];
        let listLink = [];
        list.push({
          id: '0',
          label: rcatalog.title,
          data: rcatalog,
          position: { x: 50, y: 0 + addHeight }
        });
        let countV = 1;
        let datasetNV = '';
        for (let i = 0; i < rcatalog.datasets.length; i++) {
          countV += 1;

          if (label == rcatalog.datasets[i].title) {
            datasetNV = rcatalog.datasets[i].title;
            list.push({
              id: countV,
              label: rcatalog.datasets[i].title,
              position: { x: 50, y: 0 },
              data: rcatalog.datasets[i]
            });
          } else {
            list.push({
              id: countV,
              label: rcatalog.datasets[i].title,
              position: { x: 250, y: (i + 1) * 100 + addHeight },
              data: rcatalog.datasets[i]
            });
          }
          listLink.push({source: "0", target: countV});
          const idvvv = countV;
          for (let j = 0; j < rcatalog.datasets[i].datas.length; j++) {
            countV += 1;
            if (label == rcatalog.datasets[i].datas[j].title) {
              list.push({
                id: countV,
                label: rcatalog.datasets[i].datas[j].title,
                position: { x: 50, y: 0 },
                data: rcatalog.datasets[i].datas[j]
              });
            } else {
              if (datasetNV == rcatalog.datasets[i].title) {
                list.push({
                  id: countV,
                  label: rcatalog.datasets[i].datas[j].title,
                  position: { x: 300 + ((j + 1) * 200), y: 200 },
                  data: rcatalog.datasets[i].datas[j]
                });
              } else {
                list.push({
                  id: countV,
                  label: rcatalog.datasets[i].datas[j].title,
                  position: { x: 300 + ((j + 1) * 200), y: ((i + 1) * 100) + 100 + addHeight },
                  data: rcatalog.datasets[i].datas[j]
                });
              }
            }
            listLink.push({source: idvvv, target: countV});
          }
        }
        const ini = {
          nodes: list,
          edges: listLink,
          isStatic: true,
          isVertical: true,
          isDirected: true,
          height: 150 * rcatalog.datasets.length + addHeight,
        };
        await setData(ini);
        await setText2(label);
      }






    } else if ('data' == __pmdtype) {



      const res = await axios.get('http://172.23.67.87:5000/api/hdatas', {headers: {"Token":token}, data:{}});
      const addHeight = 200;
      if (res.data) {
        const rcatalog = res.data;
        let list = [];
        let listLink = [];
        list.push({
          id: '0',
          label: rcatalog.title,
          data: rcatalog,
          position: { x: 50, y: 0 + addHeight }
        });
        let countV = 1;
        let datasetNV = '';
        for (let i = 0; i < rcatalog.datasets.length; i++) {
          countV += 1;

          const result = rcatalog.datasets[i].datas.filter((ddata) => label == ddata.title);
          if (result.length > 0) {
            datasetNV = rcatalog.datasets[i].title;
            list.push({
              id: countV,
              label: rcatalog.datasets[i].title,
              position: { x: 50, y: 100 },
              data: rcatalog.datasets[i]
            });
          } else {
            list.push({
              id: countV,
              label: rcatalog.datasets[i].title,
              position: { x: 250, y: (i + 1) * 100 + addHeight },
              data: rcatalog.datasets[i]
            });
          }
          listLink.push({source: "0", target: countV});
          const idvvv = countV;
          for (let j = 0; j < rcatalog.datasets[i].datas.length; j++) {
            countV += 1;
            if (label == rcatalog.datasets[i].datas[j].title) {
              list.push({
                id: countV,
                label: rcatalog.datasets[i].datas[j].title,
                position: { x: 50, y: 0 },
                data: rcatalog.datasets[i].datas[j]
              });
            } else {
              if (datasetNV == rcatalog.datasets[i].title) {
                list.push({
                  id: countV,
                  label: rcatalog.datasets[i].datas[j].title,
                  position: { x: 300 + ((j + 1) * 200), y: 200 },
                  data: rcatalog.datasets[i].datas[j]
                });
              } else {
                list.push({
                  id: countV,
                  label: rcatalog.datasets[i].datas[j].title,
                  position: { x: 300 + ((j + 1) * 200), y: ((i + 1) * 100) + 100 + addHeight },
                  data: rcatalog.datasets[i].datas[j]
                });
              }
            }
            listLink.push({source: idvvv, target: countV});
          }
        }
        const ini = {
          nodes: list,
          edges: listLink,
          isStatic: true,
          isVertical: true,
          isDirected: true,
          height: 150 * rcatalog.datasets.length + addHeight,
        };
        await setData(ini);
        await setText2(label);
      }



    } else {
      alert('type error');
    }

  }
  async function doXY(selectV) {
    try {
      if (!selectV) {
        selectV = text3;
      }
      const res = await axios.get('http://172.23.67.87:5000/api/pdatas?v=' + selectV, {headers: {"Token":token}, data:{}});
      if (res.data) {
        const res2 = await axios.get('http://172.23.67.87:5000/api/pdacs?v=' + selectV, {headers: {"Token":token}, data:{}});
        const mapDatas = res2.data;
        Object.keys(mapDatas).forEach((keyItem) => {
          mapDatas[keyItem]["metadata"]['data'] = JSON.parse(mapDatas[keyItem]["metadata"]['jsonStr']);
          mapDatas[keyItem]["schema"]['data'] = JSON.parse(mapDatas[keyItem]["schema"]['jsonStr']);
          delete mapDatas[keyItem]["metadata"]['jsonStr'];
          delete mapDatas[keyItem]["schema"]['jsonStr'];
        });
        const res3 = await axios.get('http://172.23.67.87:5000/api/pfdata?v=' + selectV, {headers: {"Token":token}, data:{}});
        const pfDatas = res3.data;

        const res4 = await axios.get('http://172.23.67.87:5000/api/pcdata', {headers: {"Token":token}, data:{}});
        setData4(res4.data);

        const categories = res.data;
        let list = [];
        let listLink = [];
        //list.push({
        //  id: '0',
        //  label: 'ALL',
        //  position: { x: 0, y: 0 }
        //});
        let countV = 1;
        let heightV = -100;

        let categoryPid = 0;
        let groupPid = 0;
        let dacsPid = 0;
        let aliasPid = 0;
        let dataSetPid = 0;

        let pfDataHeight = 0;
        let pfDataIdMap = {};
        Object.keys(pfDatas).forEach((keyItem) => {
          countV += 1;
          list.push({
            id: countV,
            label: keyItem,
            position: { x: 1000, y: pfDataHeight },
            data: pfDatas[keyItem]
          });
          pfDataIdMap[keyItem] = countV;
          pfDataHeight += 200;
        });



        categories.forEach((category) => {

          countV += 1;
          heightV += 100;
          list.push({
            id: countV,
            label: category.pname,
            position: { x: 50, y: heightV },
            data: category
          });
          heightV += 50
          categoryPid = countV;

          category.datas.forEach((group) => {
            countV += 1;
            list.push({
              id: countV,
              label: group.pname,
              position: { x: 150, y: heightV },
              data: group
            });
            heightV += 50
            groupPid = countV;
            listLink.push({source: categoryPid, target: groupPid});


            group.datas.forEach((alias) => {

              countV += 1;
              list.push({
                id: countV,
                label: alias.id,
                position: { x: 250, y: heightV },
                data: mapDatas[alias.id]
              });
              dacsPid = countV;
              listLink.push({source: groupPid, target: dacsPid});


              countV += 1;
              list.push({
                id: countV,
                label: alias.pname,
                position: { x: 450, y: heightV },
                data: alias
              });
              heightV += 50
              aliasPid = countV;
              listLink.push({source: dacsPid, target: aliasPid});

              alias.datas.forEach((dataSet) => {
                countV += 1;
                list.push({
                  id: countV,
                  label: dataSet.pname,
                  position: { x: 550, y: heightV },
                  data: dataSet
                });
                heightV += 50
                dataSetPid = countV;
                listLink.push({source: aliasPid, target: dataSetPid});

                const pfDataIds = dataSet.ids.split(',');
                pfDataIds.forEach((pfDataId) => {
                  listLink.push({source: dataSetPid, target: pfDataIdMap[pfDataId]});
                });

              });

            });

          });


        });
        const ini = {
          nodes: list,
          edges: listLink,
          isStatic: true,
          isVertical: true,
          isDirected: true,
          height: countV * 50
        };
        await setData(ini);
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }



const styleJ = {
  backgroundColor: "white",
  display: "flex",
  width: "auto",
  overflow: "auto"
};


const graphJsonObj = {
        nodes: [{
            id: '0',
            label: 'Alice',
            position: {x: 150, y: 250},
        },
        {
            id: '1',
            label: 'Bob',
            position: {x: 350, y: 350},
        }],
        edges: [{
            source: '0',
            target: '1'
        }]
    };


  const Litem = () => {
    const handleChange = async (event) => {
      setText3(event.target.value);
      await doXY(event.target.value);
    };
    return (
      <Select
        labelId="demo-simple-select-standard-label"
        id="demo-simple-select-standard"
        value={text3}
        onChange={handleChange}
        label="Category"
        style={{width: "100%"}}
      >
        <MenuItem value="">
          全て
        </MenuItem>
        {data4.map(v => (
          <MenuItem key={v} value={v}>{v}</MenuItem>
        ))}
      </Select>
    );
  };

  const fetcher = createGraphiQLFetcher({ url: 'http://172.23.67.87:4000/graphql' });
  return (
    <React.StrictMode>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <Divider style={{margin: "180px", marginTop: "80px", marginBottom: "80px"}}>
          <Chip label="API" color="primary" variant="outlined" size="large" />
        </Divider>
      </Box>



      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableBody>
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
              </TableCell>
              <TableCell>
              </TableCell>
              <TableCell>
                <Button variant="outlined" size="small" onClick={() => doSomethingWithArg()}>Create</Button>
              </TableCell>
            </TableRow>
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
              </TableCell>
              <TableCell>
                <InputLabel id="demo-simple-select-standard-label">Category</InputLabel>
                <Litem />
              </TableCell>
              <TableCell>
                <Button variant="outlined" size="small" onClick={() => doXY()}>Init</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ width: '100%', typography: 'body1' }}>
        <Divider style={{margin: "180px", marginTop: "80px", marginBottom: "80px"}}>
          <Chip label="Edit" color="primary" variant="outlined" size="large" />
        </Divider>
      </Box>

      <Box sx={{ width: '100%', typography: 'body1' }}>
        <GrapgContext.Provider value={{ data, setData }}>
          <Viz />
        </GrapgContext.Provider>
      </Box>

      <Box sx={{ width: '100%', typography: 'body1' }}>
        <Divider style={{margin: "180px", marginTop: "80px", marginBottom: "80px"}}>
          <Chip label="Query" color="primary" variant="outlined" size="large" />
        </Divider>
      </Box>

      <Box sx={{ width: '100%', typography: 'body1' }}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography>Query</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <GraphiQL fetcher={fetcher} query={jcol} /> 
          </AccordionDetails>
        </Accordion>
      </Box>

      <Box sx={{ width: '100%', typography: 'body1' }}>
        <Divider style={{margin: "180px", marginTop: "80px", marginBottom: "80px"}}>
          <Chip label="Node" color="primary" variant="outlined" size="large" />
        </Divider>
      </Box>

      <Box sx={{ width: '100%', typography: 'body1' }}>
        {Ltable(example)}
      </Box>

    </React.StrictMode>
  );
}
