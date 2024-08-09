para poder utilizar el programa como administrador necesitaremos correr en el sql una insercion de 
usuario super administrador

estructura:
INSERT INTO `usuarios` (`pk`, `correo`) VALUES ('1', '[correo institucional]');
INSERT INTO `administradores` (`fk_Usuario`) VALUES ('1');

ejemplo
INSERT INTO `usuarios` (`pk`, `correo`) VALUES ('1', '202100083@upqroo.edu.mx');
INSERT INTO `administradores` (`fk_Usuario`) VALUES ('1');