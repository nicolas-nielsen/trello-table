import Box from '@mui/material/Box';
import Image from 'next/image';

export function Header() {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{ bgcolor: 'black', height: 40 }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{
          opacity: 0.5,
          '&:hover': {
            cursor: 'pointer',
            opacity: 0.8,
          },
        }}
      >
        <Image src="/logo.png" alt="logo" width={80} height={30} />
      </Box>
    </Box>
  );
}
