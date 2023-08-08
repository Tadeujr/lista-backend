import { binding, given, then, when } from 'cucumber-tsflow';
import { Test, TestingModule } from '@nestjs/testing';
import * as jest from 'jest-mock';
import { assert } from 'chai';
import { ProductController } from '../../../src/controllers/product/product.controller';
import { ProductService } from '../../../src/services/product/product.service';
import { ProductDto } from '../../../src/dto/product/product.dto';
import { ProductE } from '../../../src/entities/product.entity';

const product1 = new ProductDto(
    'Atacado Vem',
    'Hortifruti',
    'BATATA DOCE kg',
    'N/A',
    11.39,
    '25/01/2022',
    2.855,
    'KG',
    true,
    1,
);
const product2 = new ProductDto(
    'Atacado Vem',
    'Hortifruti',
    'CEBOLA kg',
    'N/A',
    1.535,
    '25/01/2022',
    9.96,
    'KG',
    true,
    1,
);

const newproducts = [product1, product2];
const productEntities: ProductE[] = newproducts.map(dto => {
    const entity: ProductE = new ProductE();
    entity.store = dto.store;
    entity.category = dto.category;
    entity.productName = dto.productName;
    entity.brand = dto.brand;
    entity.price = dto.price;
    entity.buyDate = dto.buyDate;
    entity.unity = dto.unity;
    entity.commercialUnit = dto.commercialUnit || ''; // Defina um valor padrão caso não esteja presente
    entity.wasAcquired = dto.wasAcquired;
    entity.list = dto.list;
    return entity;
});

@binding()
export class ProductsSteps {
    private productController: ProductController;
    private productService: ProductService;
    private result: any;

    @given(/^eu tenha uma lista cadastrada/)
    public async createProducts(): Promise<void> {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ProductController],
            providers: [
                {
                    provide: ProductService,
                    useValue: {
                        listUsers: jest
                            .fn<() => Promise<ProductE[]>>()
                            .mockResolvedValue(productEntities),
                        findOneOrFail: jest
                            .fn<() => Promise<ProductE[]>>()
                            .mockResolvedValue(productEntities),
                        createProduct: jest
                            .fn<() => Promise<ProductE[]>>()
                            .mockResolvedValue(productEntities),
                    },
                },
            ],
        }).compile();
        // console.log('Testing module created:', module);
        this.productController =
            module.get<ProductController>(ProductController);
        this.productService = module.get<ProductService>(ProductService);
    }

    @when(/^eu adicionar produto que comprei a lista/)
    public async iAddnewproduuct(): Promise<void> {
        this.result = await this.productService.createProduct(productEntities);
    }

    @then(/^eu devo ver os produtos que acabei de cadastrar/)
    public async iViewProducts(): Promise<void> {
        assert.deepEqual(this.result, newproducts, 'Not pass in list Products');
        console.log(this.result);
    }
}
