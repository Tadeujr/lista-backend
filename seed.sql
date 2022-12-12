/*Lista para teste do CRUD*/
INSERT INTO public.product_e(
	store, "productName", price, "buyDate", unity,"wasAcquired")
	VALUES ('Lojas Americanas', 'Biscoito Recheado', 1.99, '05/11/2022', 1,true),
			('Carrefour', 'Geléia', 14.99, '05/11/2022', 1,true),
			('Extra', 'Picanha', 59.69, '05/11/2022', 1,true),
			('Epa', 'Cerveja', 4.99, '05/11/2022', 6,true)
		   
		   ;

select * from public.person_e
select * from public.user_e
select * from shopping_list_e
select * from public.product_e

INSERT INTO public.person_e(
	name, city, uf, zipcode, email)
	VALUES ( 'Tadeu Junior', 'Guarapari', 'ES', '29157853', 'tadeu@hotmail.com');

INSERT INTO public.person_e(
	name, city, uf, zipcode, email)
	VALUES ( 'Tadeu 2', 'Guarapari', 'ES', '29157853', 'tadeu@hotmail.com');


INSERT INTO public.user_e(
	login, password, "personId")
	VALUES ('Tadeu Junior', '123', 1);

INSERT INTO public.user_e(
	login, password, "personId")
	VALUES ('Tadeu', '123', 2);

INSERT INTO public.shopping_list_e(
	 total, "dateList","userId")
	VALUES ( 0, '18/11/2022', 2);

DROP TABLE	public.person_e,public.user_e,shopping_list_e, public.product_e CASCADE


