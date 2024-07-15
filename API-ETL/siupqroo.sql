-- MySQL Workbench Synchronization
-- Generated: 2024-06-30 16:49
-- Model: New Model
-- Version: 1.0
-- Project: Name of the project
-- Author: David

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

CREATE SCHEMA IF NOT EXISTS `SIUPQROO` DEFAULT CHARACTER SET latin1 ;

CREATE TABLE IF NOT EXISTS `SIUPQROO`.`Profesores` (
  `pk` INT(11) NOT NULL,
  `nombre` VARCHAR(45) NULL DEFAULT NULL,
  `cant_carr` VARCHAR(3) NULL DEFAULT NULL,
  `p_ap` INT(3) NULL DEFAULT NULL,
  `p_rep` INT(3) NULL DEFAULT NULL,
  PRIMARY KEY (`pk`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;

CREATE TABLE IF NOT EXISTS `SIUPQROO`.`Carreras` (
  `pk` INT(11) NOT NULL,
  `nombre` VARCHAR(45) NULL DEFAULT NULL,
  `cant_grup` VARCHAR(3) NULL DEFAULT NULL,
  `p_ap` INT(3) NULL DEFAULT NULL,
  `p_rep` INT(3) NULL DEFAULT NULL,
  PRIMARY KEY (`pk`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;

CREATE TABLE IF NOT EXISTS `SIUPQROO`.`Materias` (
  `pk` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NULL DEFAULT NULL,
  `cant_grup` VARCHAR(3) NULL DEFAULT NULL,
  `p_ap` INT(3) NULL DEFAULT NULL,
  `p_rep` INT(3) NULL DEFAULT NULL,
  `codigo` VARCHAR(10) NULL NOT NULL UNIQUE, 
  `Cant_alum_rep` INT(3) NULL DEFAULT NULL,
  `Cant_alum_ap` INT(3) NULL DEFAULT NULL,
  PRIMARY KEY (`pk`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;

CREATE TABLE IF NOT EXISTS `SIUPQROO`.`Grupos` (
  `pk` INT(11) NOT NULL AUTO_INCREMENT,
  `cant_mat` VARCHAR(3) NULL DEFAULT NULL,
  `p_ap` INT(3) NULL DEFAULT NULL,
  `p_rep` INT(3) NULL DEFAULT NULL,
  `codigo` VARCHAR(10) NULL NOT NULL UNIQUE,
  `turno` VARCHAR(1) NULL DEFAULT NULL,
  `Carreras_pk` INT(11) NOT NULL,
  PRIMARY KEY (`pk`, `Carreras_pk`),
  INDEX `fk_Grupos_Carreras1_idx` (`Carreras_pk` ASC),
  CONSTRAINT `fk_Grupos_Carreras1`
    FOREIGN KEY (`Carreras_pk`)
    REFERENCES `SIUPQROO`.`Carreras` (`pk`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;

CREATE TABLE IF NOT EXISTS `SIUPQROO`.`Alumnos` (
  `matricula` INT(11) NOT NULL,
  `nombre` VARCHAR(45) NULL DEFAULT NULL,
  `p_ap` INT(3) NULL DEFAULT NULL,
  `p_rep` INT(3) NULL DEFAULT NULL,
  PRIMARY KEY (`matricula`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;

CREATE TABLE IF NOT EXISTS `SIUPQROO`.`List_Asig` (
  `Profesores_pk` INT(11) NOT NULL,
  `Carreras_pk` INT(11) NOT NULL,
  INDEX `fk_List_P-C_Profesores_idx` (`Profesores_pk` ASC),
  INDEX `fk_List_P-C_Carreras1_idx` (`Carreras_pk` ASC),
  CONSTRAINT `fk_List_P-C_Profesores`
    FOREIGN KEY (`Profesores_pk`)
    REFERENCES `SIUPQROO`.`Profesores` (`pk`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_List_P-C_Carreras1`
    FOREIGN KEY (`Carreras_pk`)
    REFERENCES `SIUPQROO`.`Carreras` (`pk`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;

CREATE TABLE IF NOT EXISTS `SIUPQROO`.`Periodos` (
  `pk` INT(11) NOT NULL,
  `fecha_fin` DATETIME NULL DEFAULT NULL,
  `Periodo` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`pk`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;

CREATE TABLE IF NOT EXISTS `SIUPQROO`.`List_Calif` (
  `fk_grupos` INT(11) NOT NULL,
  `fk_materias` INT(11) NOT NULL,
  `fk_alumnos` INT(11) NOT NULL,
  `calif` INT(3) NULL DEFAULT NULL,
  `fk_Periodos` INT(11) NOT NULL,
  INDEX `fk_List_G-M_Grupos1_idx` (`fk_grupos` ASC),
  INDEX `fk_List_G-M_Materias1_idx` (`fk_materias` ASC),
  INDEX `fk_List_G-M_Alumnos1_idx` (`fk_alumnos` ASC),
  INDEX `fk_List_Calif_Cuatrimestre1_idx` (`fk_Periodos` ASC),
  CONSTRAINT `fk_List_G-M_Grupos1`
    FOREIGN KEY (`fk_grupos`)
    REFERENCES `SIUPQROO`.`Grupos` (`pk`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_List_G-M_Materias1`
    FOREIGN KEY (`fk_materias`)
    REFERENCES `SIUPQROO`.`Materias` (`pk`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_List_G-M_Alumnos1`
    FOREIGN KEY (`fk_alumnos`)
    REFERENCES `SIUPQROO`.`Alumnos` (`matricula`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_List_Calif_Cuatrimestre1`
    FOREIGN KEY (`fk_Periodos`)
    REFERENCES `SIUPQROO`.`Periodos` (`pk`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;

CREATE TABLE IF NOT EXISTS `SIUPQROO`.`Usuarios` (
  `pk` INT(11) NOT NULL AUTO_INCREMENT,
  `correo` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`pk`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;

CREATE TABLE IF NOT EXISTS `SIUPQROO`.`Directores` (
  `fk_Usuario` INT(11) NOT NULL UNIQUE,
  `fk_Carrera` INT(11) NOT NULL,
  INDEX `fk_Usuario_Directores_idx` (`fk_Usuario` ASC),
  INDEX `fk_Carrera_Directores_idx` (`fk_Carrera` ASC),
  CONSTRAINT `fk_Usuario_Directores`
    FOREIGN KEY (`fk_Usuario`)
    REFERENCES `SIUPQROO`.`Usuarios` (`pk`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Carrera_Directores`
    FOREIGN KEY (`fk_Carrera`)
    REFERENCES `SIUPQROO`.`Carreras` (`pk`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;

CREATE TABLE IF NOT EXISTS `SIUPQROO`.`Administradores` (
  `fk_Usuario` INT(11) NOT NULL UNIQUE,
  INDEX `fk_Usuario_Administradores_idx` (`fk_Usuario` ASC),
  CONSTRAINT `fk_Usuario_Administradores`
    FOREIGN KEY (`fk_Usuario`)
    REFERENCES `SIUPQROO`.`Usuarios` (`pk`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;

CREATE TABLE IF NOT EXISTS `SIUPQROO`.`SecretariosAcademicos` (
  `fk_Usuario` INT(11) NOT NULL UNIQUE,
  INDEX `fk_Usuario_SecretariosAcademicos_idx` (`fk_Usuario` ASC),
  CONSTRAINT `fk_Usuario_SecretariosAcademicos`
    FOREIGN KEY (`fk_Usuario`)
    REFERENCES `SIUPQROO`.`Usuarios` (`pk`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
