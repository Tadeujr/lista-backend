/*Lista para teste do CRUD*/
select * from public.person
select * from public.user
select * from "shoppingList"
select * from public.product

INSERT INTO public.person(
	name, city, uf, zipcode)
	VALUES ( 'Tadeu Junior', 'Guarapari', 'ES', '29157853');

INSERT INTO public.person(
	name, city, uf, zipcode)
	VALUES ( 'Tadeu 2', 'Guarapari', 'ES', '29157853');
	
	


INSERT INTO public.user(
	email, password,"personId")
	VALUES ('tadeu@hotmail.com', '123', 1);

INSERT INTO public.user(
	email, password,"personId")
	VALUES ('tadeu2@hotmail.com', '123', 2);



INSERT INTO "shoppingList"(
	 total, "dateList","userId")
	VALUES ( 0, '18/11/2022', '1bd5084c-f379-46db-8721-70819929533a');

INSERT INTO "shoppingList"(
	 total, "dateList","userId")
	VALUES ( 0, '18/11/2022', '406f3beb-7054-481c-a067-0ce075c0493a');


INSERT INTO public.product(
	store, "productName", brand, price, "buyDate", unity, "wasAcquired", "listId")

	VALUES ('Lojas Americanas', 'Biscoito Recheado','Liane' ,1.99, '05/11/2022', 1,true,1),
			('Carrefour', 'Geléia', 'Linea',14.99, '05/11/2022', 1,true,2),
			('Extra', 'Picanha', 'Friboi',59.69, '05/11/2022', 1,true,2),
			('Epa', 'Cerveja', 'Colorado',4.99, '05/11/2022', 6,true,1)
		   
		   ;