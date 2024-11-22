import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ProductosService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Crea un nuevo producto en la base de datos.
   * @param createProductoDto Datos para crear el producto.
   * @returns El producto creado.
   */
  async create(createProductoDto: CreateProductoDto) {
    // Crea el producto en la base de datos usando Prisma.
    return await this.prisma.product.create({ data: createProductoDto });
  }

  /**
   * Obtiene todos los productos que no han sido eliminados (soft delete).
   * @returns Lista de productos.
   */
  async findAll(): Promise<CreateProductoDto[]> {
    // Busca productos que no estén marcados como eliminados.
    const productos = await this.prisma.product.findMany({ where: { deletedAt: null } });

    // Lanza una excepción si no se encuentran productos.
    if (productos.length === 0) {
      throw new NotFoundException('No se encontraron productos disponibles');
    }

    return productos;
  }

  /**
   * Busca un producto por su ID. Puede incluir eliminados si se especifica.
   * @param id Identificador del producto.
   * @param getDeletes Indica si se incluyen productos eliminados.
   * @returns El producto encontrado.
   */
  async findOne(id: number, getDeletes?: boolean) : Promise<CreateProductoDto> {
    // Define los criterios de búsqueda.
    const whereCondition = { id, deletedAt: null };
    if (getDeletes) delete whereCondition['deletedAt'];

    // Busca el producto en la base de datos.
    const producto = await this.prisma.product.findFirst({ where: whereCondition });

    // Lanza una excepción si no se encuentra el producto.
    if (!producto) {
      throw new NotFoundException(`Producto con ID #${id} no encontrado`);
    }

    return producto;
  }

  /**
   * Actualiza un producto existente.
   * @param id Identificador del producto.
   * @param updateProductoDto Datos para actualizar.
   * @param includeDeleted Indica si se permite actualizar un producto eliminado.
   * @returns El producto actualizado.
   */
  async update(id: number, updateProductoDto: Partial<UpdateProductoDto>, includeDeleted: boolean = false) {
    // Verifica que el producto exista antes de actualizarlo.
    await this.findOne(id, includeDeleted);

    // Actualiza el producto en la base de datos.
    return await this.prisma.product.update({
      where: { id },
      data: updateProductoDto,
    });
  }

  /**
   * Marca un producto como eliminado (soft delete).
   * @param id Identificador del producto.
   * @returns Mensaje indicando que el producto ha sido eliminado.
   */
  async remove(id: number): Promise<string> {
    // Verifica que el producto exista antes de marcarlo como eliminado.
    await this.findOne(id);

    // Marca el producto como eliminado estableciendo `deletedAt` a la fecha actual.
    await this.update(id, { deletedAt: new Date() });
    return `El producto con ID #${id} ha sido eliminado`;
  }

  /**
   * Restaura un producto previamente eliminado.
   * @param id Identificador del producto.
   * @returns El producto restaurado.
   */
  async restore(id: number): Promise<CreateProductoDto> {
    // Restaura el producto estableciendo `deletedAt` a null.
    return await this.update(id, { deletedAt: null }, true);
  }
}
