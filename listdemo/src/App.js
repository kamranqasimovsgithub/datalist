import './App.css';
import 'antd/dist/antd.min.css'
import React, { useEffect, useState } from 'react'
import { Modal, Table, Button } from 'antd'
import { Paper, Box } from '@mui/material';

function App() {  
  const [loading, setLoading]= useState(false)
  const [dataSource, setDataSource]= useState([])
  
  //Fetching JSON data from the URL
  
  useEffect(()=>{
    setLoading(true)
    fetch("http://localhost:5000/posts")
    .then (response=>response.json())
    .then (data=>{      
      setDataSource(data)
    }).catch(err=>{
      console.log(err)
    }).finally(()=>{
      setLoading(false)
    })
  },[])

  //Setting column headings and data

  const columns = [
    {
      key:"1",
      title:"Task ID",
      dataIndex:"id"
    },
    {
      key:"2",
      title:"Task Name",
      dataIndex:"taskName"      
    },
    {
      key:"3",
      title:"Task Status",
      dataIndex:"taskStatus",
      render:(taskStatus)=>{                      
        return <p>{taskStatus ? 1 : 0}</p>
      }
    },
    {
      key:"5",
      title:"Parent ID",
      dataIndex:"parentId" 
    },
    {
      key: "6",
      title: "Actions",
      render: (record) => {
        return (
          <>
            <Button 
              type='primary'
              onClick={() => {                
                onStartItem(record);  
              }}
              style={{"backgroundColor":""}}
            >START</Button>
            <Button
              type="primary" danger ghost
              style={{  color: "red", marginLeft: 12 }}
              onClick={() => {                
                onDeleteItem(record);  
              }}              
            >DELETE</Button>            
          </>
        );
      },
    },
  ]

  //Activating task status

  const onStartItem = (record) => {    
    let arr = [...dataSource];    
    arr.map((k)=>{
      if(k.id === record.parentId){
        k.taskStatus = 1;
      }
      if(k.id === record.id ){
        k.taskStatus = 1;
      }
    });   
    setDataSource(arr);        
  };

  //Deleting current record

  const onDeleteItem = (record) => {
    Modal.confirm({
      title: "Are you sure, you want to delete this task?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setDataSource((pre) => {
          if(!record.parentId){             
            return pre.filter((data) =>  data.id !== record.id );
          }
          else{
            return pre.filter((data) =>  data.id !== record.id && data.parentId !== record.id);            
          }
        });
      },
    });
  };

  return (
    <div className="App">
      <header className="App-header">        
        <Box
          sx={{
            display: 'flex',
            '& > :not(style)': {
              m: 1,
              width: 630,
              height: "auto",
            },
          }}
        >         
          <Paper id="paper" variant="outlined" square >Task Management</Paper>
        </Box> 

        {/*Our table*/}
        <Table 
          loading={loading}
          columns={columns}
          dataSource ={dataSource}  
          pagination={false}             
        >   
        </Table>                
      </header>
    </div>
  );
}

export default App;