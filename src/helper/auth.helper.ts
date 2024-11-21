import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

/**
 * @description
 * Hashea la contraseña con bcrypt y un salt de 10
 * 
 * @param {string} password - La contraseña en texto plano que será hasheada
 * @returns {Promise<string>} El hash de la contraseña
 */
export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

/**
 * @description
 * Verifica si la contraseña hasheada es correcta
 * 
 * @param {string} enteredPassword - La contraseña que puso el usuario
 * @param {string} storedHash - La contraseña hasheada
 * @returns {Promise<boolean>} `true` si las contraseñas coinciden, `false` en caso de que no
 */
export const checkPassword = async (
  enteredPassword: string,
  storedHash: string,
): Promise<boolean> => {
  return bcrypt.compare(enteredPassword, storedHash);
};

/**
 * @description
 * Genera un JWT
 * 
 * @param {JwtService} jwtService - El servicio de JWT
 * @param {any} payload - Los datos que se incluirán en el token
 * @returns {string} El token JWT generado
 */
export const generateToken = (jwtService: JwtService, payload: any): string => {
  return jwtService.sign(payload, { expiresIn: '180d' });
};
