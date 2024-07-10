import React, { useState } from 'react';
import { Container, Typography, Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';

const DeleteDataView: React.FC = () => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = () => {
        // TODO
        handleClose();
    };

    const periods = [
        { period: 'Enero - Abril', year: 2020 },
        { period: 'Mayo - Agosto', year: 2020 },
        { period: 'Septiembre - Diciembre', year: 2020 },
    ];

    const userType = "Administrador"

    return (
        <Container maxWidth="lg">
            <Typography my={4} variant="h5" component="h1">
                Bienvenido {userType}
            </Typography>
            <Box sx={{ border: '1px solid #030303', borderRadius: "18px" }}>
                <Box sx={{ bgcolor: "#590100", color: "white", paddingLeft: "50px", paddingTop: "10px", paddingBottom: "10px", borderTopLeftRadius: "16px", borderTopRightRadius: "16px" }} >
                    <Typography variant="h6" component="h2">
                        Eliminar datos guardados
                    </Typography>
                </Box>
                <Typography variant='subtitle1' sx={{ paddingLeft: "50px", paddingTop: "20px", paddingBottom: "20px" }}>
                    Puedes eliminar los siguientes datos
                </Typography>
                <TableContainer component={Paper} sx={{ marginLeft: "50px", marginTop: "10px", marginBottom: "10px", marginRight: "50px", maxWidth: 1050 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: "bold", border: "1px solid #ddd", textAlign: "center" }}> Periodo Cuatrimestral</TableCell>
                                <TableCell sx={{ fontWeight: "bold", border: "1px solid #ddd", textAlign: "center" }}>Año</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {periods.map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell sx={{ border: '1px solid #ddd', textAlign: "center" }}>{row.period}</TableCell>
                                    <TableCell sx={{ border: '1px solid #ddd', textAlign: "center" }}>{row.year}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box my={6} mx={5} display="flex" justifyContent="right">
                    <Button variant="contained" color="warning" sx={{ mr: 2 }}>
                        Volver a la página principal
                    </Button>
                    <Button variant="contained" color="error" onClick={handleClickOpen}>
                        <DeleteIcon />
                        Eliminar todo
                    </Button>
                </Box>
            </Box>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    Eliminar
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{ color: 'grey.500' }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        ¿Estás seguro de que deseas eliminar los datos?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="outlined" color="inherit">
                        No
                    </Button>
                    <Button onClick={handleDelete} variant="contained" color="error" autoFocus>
                        Sí
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default DeleteDataView;
