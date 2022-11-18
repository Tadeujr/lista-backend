/*Lista para teste do CRUD*/
INSERT INTO public.product_e(
	store, "productName", price, "buyDate", unity,"wasAcquired")
	VALUES ('Lojas Americanas', 'Biscoito Recheado', 1.99, '05/11/2022', 1,true),
			('Carrefour', 'Geléia', 14.99, '05/11/2022', 1,true),
			('Extra', 'Picanha', 59.69, '05/11/2022', 1,true),
			('Epa', 'Cerveja', 4.99, '05/11/2022', 6,true)
		   
		   ;


INSERT INTO public.person_e(
	name, city, uf, zipcode, email)
	VALUES ( 'Tadeu Junior', 'Guarapari', 'ES', '29157853', 'tadeu@hotmail.com');


INSERT INTO public.user_e(
	login, password, "personFkId")
	VALUES ('Tadeu Junior', '123', 1);

INSERT INTO public.shopping_list_e(
	"idUser", total, "dateList")
	VALUES ( 1, 0, '18/11/2022');