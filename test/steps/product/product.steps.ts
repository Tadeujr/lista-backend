// import { binding, given, then, when } from 'cucumber-tsflow';
// import { Test, TestingModule } from '@nestjs/testing';
// import * as jest from 'jest-mock';
// import { assert } from 'chai';
// import { ProductController } from '../../../src/controllers/product/product.controller';
// import { ProductService } from '../../../src/services/product/product.service';
// import { ProductDto } from '../../../src/dto/product/product.dto';
// import { ProductE } from '../../../src/entities/product.entity';

// const product1 = new ProductDto(
//     1,
//     'Atacado Vem',
//     'Hortifruti',
//     'BATATA DOCE kg',
//     'N/A',
//     11.39,
//     '25/01/2022',
//     2.855,
//     'KG',
//     true,
//     1,
// );
// const product2 = new ProductDto(
//     1,
//     'Atacado Vem',
//     'Hortifruti',
//     'CEBOLA kg',
//     'N/A',
//     1.535,
//     '25/01/2022',
//     9.96,
//     'KG',
//     true,
//     1,
// );

// const newproducts = [product1, product2];
// const productEntities: ProductE[] = newproducts.map(dto => {
//     const entity: ProductE = new ProductE();
//     entity.store = dto.store;
//     entity.category = dto.category;
//     entity.productName = dto.productName;
//     entity.brand = dto.brand;
//     entity.price = dto.price;
//     entity.buyDate = dto.buyDate;
//     entity.unity = dto.unity;
//     entity.commercialUnit = dto.commercialUnit || ''; // Defina um valor padrão caso não esteja presente
//     entity.wasAcquired = dto.wasAcquired;
//     entity.list = dto.list;
//     return entity;
// });

// @binding()
// export class ProductsSteps {
//     private productController: ProductController;
//     private productService: ProductService;
//     private result: any;

//     @given(/^eu tenha uma lista cadastrada/)
//     public async createProducts(): Promise<void> {
//         const module: TestingModule = await Test.createTestingModule({
//             controllers: [ProductController],
//             providers: [
//                 {
//                     provide: ProductService,
//                     useValue: {
//                         listProduct: jest
//                             .fn<() => Promise<ProductE[]>>()
//                             .mockResolvedValue(productEntities),
//                         findOneOrFail: jest
//                             .fn<() => Promise<ProductE[]>>()
//                             .mockResolvedValue(productEntities),
//                         createProduct: jest
//                             .fn<() => Promise<ProductE[]>>()
//                             .mockResolvedValue(productEntities),
//                     },
//                 },
//             ],
//         }).compile();
//         // console.log('Testing module created:', module);
//         this.productController =
//             module.get<ProductController>(ProductController);
//         this.productService = module.get<ProductService>(ProductService);
//     }

//     @when(/^eu adicionar produto que comprei a lista/)
//     public async iAddnewproduuct(): Promise<void> {
//         this.result = await this.productService.createProduct(productEntities);
//     }

//     @then(/^eu devo ver os produtos que acabei de cadastrar/)
//     public async iViewProducts(): Promise<void> {
//         assert.deepEqual(this.result, newproducts, 'Not pass in list Products');
//         console.log(this.result);
//     }
// }
import { binding, given, then, when } from 'cucumber-tsflow';
import { Test, TestingModule } from '@nestjs/testing';
import { assert } from 'chai';
import { ProductController } from '../../../src/controllers/product/product.controller';
import { ProductService } from '../../../src/services/product/product.service';
import { ProductDto } from '../../../src/dto/product/product.dto';
import { ProductE } from '../../../src/entities/product.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EntityManager } from 'typeorm';
import { AppModule } from '../../../src/app.module';
import { shoppinglistController } from '../../../src/controllers/shoppingList/shoppingList.controller';
import { ShoppingListService } from 'src/services/shoppingList/shoppingList.service';


const product1 = new ProductDto(
    1,
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
    1,
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
    private productRepository: Repository<ProductE>;
    private entityManager: EntityManager;
    private result: any;
    private listService: ShoppingListService;


    async before(): Promise<void> {
        const module: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        this.productController = module.get<ProductController>(ProductController);
        this.productService = module.get<ProductService>(ProductService);
        this.productRepository = module.get(getRepositoryToken(ProductE));
        this.entityManager = module.get(EntityManager);
        this.listService = module.get<ShoppingListService>(ShoppingListService);

    }

    @given(/^eu tenha uma lista cadastrada/)
    public async createProducts(): Promise<void> {
        // Inserir produtos reais no banco de dados de teste
       await this.listService.allListForUser("84379a1d-66ba-416d-a7f7-33d7339a1981");
        console.log(this.listService)
    }
    
    @when(/^eu adicionar produto que comprei a lista/)
    public async iAddnewproduuct(): Promise<void> {
        // Executar a lógica real do serviço para adicionar produtos
        this.result = await this.productService.createProduct(productEntities);
    }

    // @then(/^eu devo ver os produtos que acabei de cadastrar/)
    // public async iViewProducts(): Promise<void> {
    //     // Buscar produtos reais do banco de dados e comparar com o resultado
    //     const savedProducts = await this.productRepository.find();
    //     assert.deepEqual(savedProducts, newproducts, 'Not pass in list Products');
    //     console.log(savedProducts);
    // }
}
