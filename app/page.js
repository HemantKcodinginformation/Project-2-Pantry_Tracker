'use client'
import Image from "next/image";
import { useState, useEffect } from 'react';
import { firestore } from "@/firebase";
import { Box, Typography, Modal, Stack, TextField, Button } from "@mui/material";
import { collection, deleteDoc, getDocs, getDoc, query, setDoc, doc } from "firebase/firestore";


export default function Home() {

  const [pantry, setPantry] = useState([])
  const [open, setOpen] = useState(false)
  const [pantry_item, setPantryItem] = useState("")

  const updatepantry = async () => {
    const database = query(collection(firestore, "Pantry"))
    const docs = await getDocs(database)
    const pantrylist = []
    docs.forEach((doc) => {
      pantrylist.push({
        name: doc.id,
        ...doc.data(),

      })
    })
    setPantry(pantrylist)
  }

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, "Pantry"), item)
    const docData = await getDoc(docRef)

    if (docData.exists()) {
      const { quantity } = docData.data()
      await setDoc(docRef, { quantity: quantity + 1 })
    }
    else {
      await setDoc(docRef, { quantity: 1 })
    }
    await updatepantry()
  }

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, "Pantry"), item)
    const docData = await getDoc(docRef)

    if (docData.exists()) {
      const { quantity } = docData.data()
      if (quantity === 1) {
        await deleteDoc(docRef)
      } else {
        await setDoc(docRef, { quantity: quantity - 1 })
      }
    }
    await updatepantry()
  }

  useEffect(() => {
    updatepantry()
  }, [])

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <Box
      width="100vw"
      height="100vh"
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      gap={2}
    > {/* In material UI a box is our most basic building block */}
      <Modal open={open} onClose={handleClose}>
        <Box
          position="absolute"
          top="50%"
          left="50%"
          width={400}
          bgcolor={"white"}
          border="2px solid #000000"
          boxShadow={24}
          p={4}
          display={"flex"}
          flexDirection={"column"}
          gap={3}
          sx={{
            transform: "translate(-50%, -50%)"
          }}
        >
          <Typography variant="h6">Add Item</Typography>
          <Stack width="100%" direction={"row"} spacing={2}>
            <TextField
              variant="outlined"
              fullWidth
              value={pantry_item}
              onChange={(e) => {
                setPantryItem(e.target.value)
              }}
            />
            <Button
              variant="contained"
              onClick={() => {
                addItem(pantry_item)
                setPantryItem("")
                handleClose()
              }}
            > Add</Button>

          </Stack>

        </Box>
      </Modal>
      <Button
        variant="contained"
        onClick={() => {
          handleOpen()
        }}
      > Add New Item </Button>
      <Box border="1px solid #000000">
        <Box
          width="800px"
          height="100px"
          bgcolor={"#ADD8E6"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
        > {/* The bgcolor specifies what the background color of the box field is */}
          <Typography variant="h2" color={"#000000"}>
            Pantry Tracker
          </Typography>
        </Box>
        <Stack width={"800px"} height={"300px"} spacing={2} overflow={"auto"}>
          {
            pantry.map(({ name, quantity }) => (
              <Box
                key={name}
                width={"100%"}
                minHeight={"150px"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
                bgcolor={"#f0f0f0"}
                padding={5}
              >
                <Typography variant="h3" color={"#000000"} textAlign={"center"}>
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </Typography>
                <Typography variant="h3" color={"#000000"} textAlign={"center"}>
                  {quantity}
                </Typography>
                <Stack direction={"row"} spacing={2}>
                  <Button
                    variant="contained"
                    onClick={() => {
                      addItem(name)
                    }}
                  > Add </Button>
                  <Button
                    variant="contained"
                    onClick={() => {
                      removeItem(name)
                    }}
                  > Remove </Button>
                </Stack>
              </Box>
            ))
          }
        </Stack>
      </Box>
    </Box>
  )
}
