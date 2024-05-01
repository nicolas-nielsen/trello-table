'use client';

import { List } from '@/components/list';
import React, { useEffect, useState } from 'react';
import {
  defaultTrelloLists,
  localStorageHelper,
  trelloListKey,
} from '@/utils/localstorage.helper';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { ICard, IList } from '@/types/types';
import AddIcon from '@mui/icons-material/Add';
import { generateUuid } from '@/utils/identifier.generator';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

export default function Home() {
  const initialListState: IList[] = [];
  const [lists, setLists] = useState(initialListState);
  const [isAddingList, setIsAddingList] = useState(false);
  const [listName, setListName] = useState('');

  useEffect(() => {
    try {
      if (!localStorageHelper.keyExists(trelloListKey)) {
        localStorageHelper.setDefaultList();
      }

      setLists(localStorageHelper.parseKey(trelloListKey));
    } catch (e: unknown) {
      console.error(e);

      setLists(defaultTrelloLists);
    }
  }, []);

  const addCard = (card: ICard, id: string): void => {
    const newLists: IList[] = lists.map((list: IList) => {
      if (list.id === id) {
        list.cards.push(card);
      }

      return list;
    });

    updateLists(newLists);
  };

  const updateCard = (updatedCard: ICard) => {
    const newLists = lists.map((list: IList) => {
      list.cards.map((card: ICard) => {
        if (card.id === updatedCard.id) {
          Object.assign(card, updatedCard);
        }

        return card;
      });

      return list;
    });

    updateLists(newLists);
  };

  const removeCard = (id: string): void => {
    const newLists: IList[] = lists.map((list: IList) => {
      list.cards = list.cards.filter((card: ICard) => card.id !== id);

      return list;
    });

    updateLists(newLists);
  };

  const removeList = (id: string): void => {
    const newLists: IList[] = lists.filter((list: IList) => {
      return list.id !== id;
    });

    updateLists(newLists);
  };

  const initializeData = (): void => {
    localStorageHelper.setDefaultList();
    setLists(localStorageHelper.parseKey(trelloListKey));
  };

  const updateLists = (lists: IList[]): void => {
    setLists(lists);

    localStorageHelper.setKey(lists, trelloListKey);
  };

  const handleAddList = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (listName === '') {
      return;
    }

    const list: IList = { id: generateUuid(), listName: listName, cards: [] };
    setLists((prevState) => [...prevState, list]);
    handleCloseForm();
    setListName('');
  };

  const handleCloseForm = () => {
    setIsAddingList(false);
  };

  const handleOpenForm = () => {
    setIsAddingList(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setListName(e.target.value);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', p: '8px' }}>
        <Typography
          sx={{
            color: 'primary.main',
            fontSize: 18,
            fontWeight: 700,
            pl: '12px',
          }}
        >
          Tableau principal
        </Typography>
        <Button
          variant="contained"
          onClick={initializeData}
          sx={{
            color: 'primary.main',
            bgcolor: 'info.main',
            mx: 2,
            '&:hover': {
              bgcolor: 'info.light',
              opacity: 0.8,
            },
          }}
        >
          Initialiser le jeu de données
        </Button>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, ml: 1 }}>
        {lists.map((list: IList) => (
          <List
            key={list.id}
            content={list}
            addCard={addCard}
            updateCard={updateCard}
            removeCard={removeCard}
            removeList={removeList}
          />
        ))}
        {!isAddingList && (
          <Button
            onClick={handleOpenForm}
            sx={{
              minWidth: 272,
              maxWidth: 272,
              bgcolor: 'secondary.light',
              color: 'primary.main',
              '&:hover': { bgcolor: '#ffffff52' },
            }}
          >
            <AddIcon />
            Ajouter une autre liste
          </Button>
        )}
        {isAddingList && (
          <Box
            component="form"
            onSubmit={handleAddList}
            sx={{
              minWidth: 272,
              maxWidth: 272,
              bgcolor: 'primary.dark',
              borderRadius: '3px',
              p: '3px',
            }}
          >
            <TextField
              fullWidth
              value={listName}
              onChange={handleChange}
              size="small"
              sx={{ fontSize: '14px', bgcolor: 'primary.main' }}
            />
            <Box sx={{ mt: '4px' }}>
              <Button
                type="submit"
                sx={{
                  bgcolor: 'info.main',
                  color: 'primary.main',
                  '&:hover': {
                    bgcolor: 'info.light',
                    opacity: 0.8,
                  },
                }}
              >
                Ajouter une liste
              </Button>
              <IconButton
                aria-label="close"
                onClick={handleCloseForm}
                sx={{
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}
