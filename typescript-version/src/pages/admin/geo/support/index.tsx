// React Imports
import { useState } from 'react'

// MUI Imports
import List from '@mui/material/List'
import Avatar from '@mui/material/Avatar'
import ListItem from '@mui/material/ListItem'
import IconButton from '@mui/material/IconButton'
import ListItemText from '@mui/material/ListItemText'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import MessageProcessingOutline from 'mdi-material-ui/MessageProcessingOutline'
import Box from '@mui/material/Box'

const ListItemSelected = () => {
  // States
  const [selectedIndex, setSelectedIndex] = useState<number>(1)

  const handleListItemClick = (index: number) => {
    setSelectedIndex(index)
  }

    return (
      <Box sx={{ position: 'absolute', bottom: 5, width: '80%', boxShadow: 3 }}>
    <List>
      <ListItem
        disablePadding
        secondaryAction={
          <MessageProcessingOutline/>
        }
      >
        <ListItemButton selected={selectedIndex === 0} onClick={() => handleListItemClick(0)}>
          <ListItemAvatar>
            <Avatar src='/images/avatars/2.png' alt='Caroline Black' />
          </ListItemAvatar>
          <ListItemText primary='Tristan Anthony P. Cancino' />
        </ListItemButton>
      </ListItem>
      <ListItem
        disablePadding
        secondaryAction={
          <MessageProcessingOutline/>
        }
      >
        <ListItemButton selected={selectedIndex === 1} onClick={() => handleListItemClick(1)}>
          <ListItemAvatar>
            <Avatar src='/images/avatars/1.png' alt='Alfred Copeland' />
          </ListItemAvatar>
          <ListItemText primary='Riza H. Pequiro' />
        </ListItemButton>
      </ListItem>
      <ListItem
        disablePadding
        secondaryAction={
          <MessageProcessingOutline/>
        }
      >
        <ListItemButton selected={selectedIndex === 2} onClick={() => handleListItemClick(2)}>
          <ListItemAvatar>
            <Avatar src='/images/avatars/8.png' alt='Celia Schneider' />
          </ListItemAvatar>
          <ListItemText primary='Ronbryll Jhan M. Rendon' />
        </ListItemButton>
      </ListItem>
            </List>
            </Box>
  )
}

export default ListItemSelected