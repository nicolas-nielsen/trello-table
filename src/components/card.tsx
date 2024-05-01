'use client';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { ICard } from '@/types/types';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SubjectIcon from '@mui/icons-material/Subject';
import RemoveIcon from '@mui/icons-material/Remove';
import TextField from '@mui/material/TextField';

export function Card({
  content,
  listName,
  updateCard,
  removeCard,
}: {
  content: ICard;
  listName: string;
  updateCard: Function;
  removeCard: Function;
}) {
  const [card, setCard] = useState(content);
  const [open, setOpen] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [description, setDescription] = useState(content.cardDesc);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenForm(false);
  };

  const toggleFollow = () => {
    setCard((prevState) => {
      return { ...prevState, isFollowed: !prevState.isFollowed };
    });

    updateCard({ ...card, isFollowed: !card.isFollowed });
  };

  const handleRemove = () => {
    if (
      window.confirm(
        `Voulez allez supprimer la carte nommée ${card.cardName}.\nAppuyez sur "OK" pour continuer.\nOu sur "Annuler" pour fermer.`
      )
    ) {
      removeCard(card.id);

      handleClose();
    }
  };

  const handleOpenForm = () => {
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCard((previousState) => {
      return Object.assign(previousState, { cardDesc: description });
    });

    updateCard({ ...card, cardDesc: description });

    handleCloseForm();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  return (
    <>
      <Button
        onClick={handleClickOpen}
        sx={{
          bgcolor: 'primary.main',
          color: 'secondary.dark',
          mt: '5px',
          mx: '8px',
          borderRadius: '3px',
          justifyContent: 'left',
          px: 0,
        }}
      >
        <Box>
          <Typography sx={{ px: '8px', fontFamily: 'Arial', fontSize: '14px' }}>
            {content.cardName}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'left', pl: '8px' }}>
            {card.isFollowed && (
              <VisibilityIcon sx={{ fontSize: '16px', mr: '8px' }} />
            )}
            {card.cardDesc && <SubjectIcon sx={{ fontSize: '16px' }} />}
          </Box>
        </Box>
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
        maxWidth="sm"
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{ fontSize: '20px', fontWeight: 600 }}
        >
          {content.cardName}
          <DialogContentText>
            <Box sx={{ display: 'flex' }}>
              <Typography>
                Dans la liste <u>{listName}</u>
              </Typography>
              {card.isFollowed && <VisibilityIcon sx={{ ml: 1 }} />}
            </Box>
          </DialogContentText>
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <Box display="flex">
          <DialogContent sx={{ p: '8px', pl: '24px' }}>
            <Typography sx={{ fontSize: '18px', fontWeight: 600 }}>
              Description
            </Typography>
            {!card.cardDesc && !openForm && (
              <Button onClick={handleOpenForm}>
                Ajouter une description plus détaillée...
              </Button>
            )}
            {!openForm && (
              <DialogContentText
                id="alert-dialog-description"
                onClick={handleOpenForm}
              >
                {card.cardDesc}
              </DialogContentText>
            )}
            {openForm && (
              <Box component="form" onSubmit={handleSubmit} sx={{ m: '8px' }}>
                <TextField
                  fullWidth
                  value={description}
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
                    Enregistrer
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
          </DialogContent>
          <DialogActions sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography sx={{ fontSize: '18px', fontWeight: 600 }}>
              Actions
            </Typography>
            <Button
              onClick={toggleFollow}
              fullWidth
              sx={{
                justifyContent: 'left',
                color: 'secondary.dark',
                bgcolor: '#091e420a',
                minWidth: '170px',
              }}
            >
              <VisibilityIcon sx={{ fontSize: '16px', mr: '4px' }} />
              Suivre
              {card.isFollowed && (
                <CheckBoxIcon
                  sx={{
                    color: 'info.main',
                    position: 'absolute',
                    right: 0,
                  }}
                />
              )}
            </Button>
            <Button
              onClick={handleRemove}
              fullWidth
              sx={{
                justifyContent: 'left',
                color: 'secondary.dark',
                bgcolor: '#091e420a',
                minWidth: '170px',
                mt: '5px',
              }}
            >
              <RemoveIcon />
              Supprimer
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
}
