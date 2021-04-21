--
-- Name: cart; Type: TABLE; Schema: public;
--

DROP TABLE IF EXISTS cart;
DROP TABLE IF EXISTS orders;
DROP SEQUENCE IF EXISTS products_id_seq CASCADE;
DROP SEQUENCE IF EXISTS users_user_id_seq CASCADE;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS products;



--
-- Name: users; Type: TABLE; Schema: public;
--
CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE TABLE public.users (
    user_id int PRIMARY KEY DEFAULT nextval('users_user_id_seq'),
    name VARCHAR(200) UNIQUE NOT NULL,
    password VARCHAR NOT NULL,
    email VARCHAR(255),
    credit int CHECK (credit >= 0)
);


--
-- Name: products; Type: TABLE; Schema: public;
--

CREATE TABLE public.products (
     title VARCHAR(250),
     image VARCHAR(250),
     price int,
     quantity int CHECK ( quantity >= 0 ),
     id int PRIMARY KEY DEFAULT nextval('products_id_seq')
);



ALTER SEQUENCE public.products_id_seq OWNED BY users.user_id;
ALTER SEQUENCE public.users_user_id_seq OWNED BY products.id;


--
-- Name: cart; Type: TABLE; Schema: public;
--

CREATE TABLE public.cart (
    user_id int REFERENCES public.users (user_id) ,
    item_id int REFERENCES public.products (id),
    quantity integer,
    PRIMARY KEY (user_id,item_id) 
);

--
-- Name: orders; Type: TABLE; Schema: public;
--

CREATE TABLE public.orders (
    user_id int REFERENCES public.users (user_id) ,
    item_id int REFERENCES public.products (id),
    quantity integer,
    PRIMARY KEY (user_id,item_id)
);


--
-- Data for Name: products; Type: TABLE DATA; Schema: public;
--

COPY public.products (title, image, price, quantity) FROM stdin;
MI Smart Band	https://images-na.ssl-images-amazon.com/images/I/719ZywAmvOL._SL1500_.jpg	2000	2000
water bottle	https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.9LJI_vZ41geOeg8Ze4lN1AHaHa%26pid%3DApi&f=1	200	9999
Sandisk 32 gb	https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.NUXwGgr_KeBijmFgRHF7qQHaHa%26pid%3DApi&f=1	400	9999
Canon Camera	https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.GU8Hh7jMOZ4rX8H-sClHIwHaD3%26pid%3DApi&f=1	8000	29
laptop	https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.i7JCBiLgN7MVVLBm_MoEvAHaFj%26pid%3DApi&f=1	10000	9999
mobile	https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.0WXgqo8SFGTjjwUeVwYUzgHaL9%26pid%3DApi&f=1	500	9997
\.

--
-- Data for Name: users; Type: TABLE DATA; Schema: public;
--

COPY public.users (name, password, email, credit) FROM stdin;
admin	password	email@gmail.com	50000000
\.



--
-- Data for Name: cart; Type: TABLE DATA; Schema: public;
--

COPY public.cart (user_id, item_id, quantity) FROM stdin;
\.

--
-- Data for Name: cart; Type: TABLE DATA; Schema: public;
--

COPY public.orders (user_id, item_id, quantity) FROM stdin;
\.




