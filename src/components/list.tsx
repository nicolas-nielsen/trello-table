'use client';

import React, { useState } from 'react';
import { Card } from '@/components/card';
import { generateUuid } from '@/utils/identifier.generator';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { ICard, IList } from '@/types/types';
import AddIcon from '@mui/icons-material/Add';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MuiCard from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

export function List({
  listContent,
  addCard,
  updateCard,
  removeCard,
  removeList,
}: {
  listContent: IList;
  addCard: Function;
  updateCard: Function;
  removeCard: Function;
  removeList: Function;
}) {
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [cardName, setCardName] = useState('');

  const handleAddCard = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (cardName === '') {
      return;
    }

    addCard({ id: generateUuid(), cardName }, listContent.id);
    setCardName('');
    handleCloseForm();
  };

  const handleCloseForm = () => {
    setIsAddingCard(false);
  };

  const handleOpenForm = () => {
    setIsAddingCard(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardName(e.target.value);
  };

  const handleRemoveList = () => {
    if (
      window.confirm(
        `Voulez allez supprimer la liste nommée ${listContent.listName}.\nAppuyez sur "OK" pour continuer.\nOu sur "Annuler" pour fermer.`
      )
    ) {
      removeList(listContent.id);
    }
  };

  return (
    <MuiCard
      sx={{
        minWidth: 272,
        maxWidth: 272,
        bgcolor: 'primary.dark',
        borderRadius: '3px',
      }}
    >
      <CardContent sx={{ p: 0 }}>
        <Box
          sx={{ display: 'flex', position: 'relative', px: '8px', py: '10px' }}
        >
          <Typography sx={{ fontSize: '14px', fontWeight: '600', pl: '8px' }}>
            {listContent.listName}
          </Typography>
          <IconButton
            onClick={handleRemoveList}
            sx={{
              position: 'absolute',
              right: 0,
              top: 0,
            }}
          >
            <MoreHorizIcon fontSize="small" />
          </IconButton>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          {listContent.cards.map((card: ICard) => (
            <Card
              key={card.id}
              cardContent={card}
              listName={listContent.listName}
              updateCard={updateCard}
              removeCard={removeCard}
            />
          ))}
        </Box>
        {!isAddingCard && (
          <Button
            onClick={handleOpenForm}
            sx={{ color: 'secondary.main', pl: '20px', py: '8px' }}
          >
            <AddIcon />
            Ajouter une autre carte
          </Button>
        )}
        {isAddingCard && (
          <Box component="form" onSubmit={handleAddCard} sx={{ m: '8px' }}>
            <TextField
              fullWidth
              value={cardName}
              onChange={handleChange}
              size="small"
              placeholder="Saisissez un titre pour cette carte..."
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
                Ajouter une carte
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
      </CardContent>
    </MuiCard>
  );
}
