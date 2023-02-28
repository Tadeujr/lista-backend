import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { ProductDto } from '../../dto/product/product.dto';
import { ShoppingListService } from '../shoppingList/shoppingList.service';
import { ProductE } from '../../entities/product.entity';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(ProductE)
        private readonly produtoRepository: Repository<ProductE>,
        @Inject(forwardRef(() => ShoppingListService))
        private readonly shoppingListService: ShoppingListService,
    ) {}

    async listProducts(): Promise<ProductE[]> {
        return await this.produtoRepository.query(`select * from  public.product
        order by category, "productName"`);
    }

    async createProduct(newProducts: ProductE[]): Promise<ProductE[]> {
        const products = await this.produtoRepository.save(newProducts);

        //updating ShoppingList (SUM)
        await this.updateList(true, products);

        return products;
    }

    async updateProduct(id: number, data: ProductDto): Promise<ProductE> {
        let valor: number;

        const product = await this.produtoRepository.findOneOrFail({
            where: { id },
        });

        if (data.price > product.price) {
            valor = Number(data.price) - Number(product.price);

            await this.updateValorList(true, Number(data.list), valor);
        } else if (data.price < product.price) {
            valor = Number(product.price) - Number(data.price);

            await this.updateValorList(false, Number(data.list), valor);
        }

        const productUp = await this.produtoRepository.merge(product, data);

        return await this.produtoRepository.save(productUp);
    }

    async deleteProduct(id: number): Promise<DeleteResult> {
        const products = await this.produtoRepository.query(
            `select * from product where id = ${id}`,
        );
        const deleteProduct = await this.produtoRepository.delete(id);

        await this.updateList(false, products);
        return deleteProduct;
    }

    //true for sum or false for decrease
    private async updateList(
        operation: boolean,
        products: ProductE[],
    ): Promise<any> {
        let valorList = 0.0;
        //search in database for update valor total
        const list = await this.shoppingListService.findList(
            Number(products[0].list),
        );
        valorList = Number(list[0].total);

        //sum valor products
        const totalProduct = Number(
            products
                .reduce((acum: number, item: ProductE) => {
                    return (acum += item.price);
                }, 0.0)
                .toFixed(2),
        );

        //updating the total  in "ShoppingList"
        if (operation) {
            await this.shoppingListService.updateValorList(
                Number(products[0].list),
                valorList + totalProduct,
            );
        } else {
            await this.shoppingListService.updateValorList(
                Number(products[0].list),
                valorList - totalProduct,
            );
        }
    }

    private async updateValorList(
        operation: boolean,
        listId: number,
        valor: number,
    ): Promise<any> {
        const list = await this.shoppingListService.findList(Number(listId));

        //updating the total  in "ShoppingList"
        if (operation) {
            await this.shoppingListService.updateValorList(
                listId,
                list[0].total + valor,
            );
        } else {
            await this.shoppingListService.updateValorList(
                listId,
                list[0].total - valor,
            );
        }
    }
}
