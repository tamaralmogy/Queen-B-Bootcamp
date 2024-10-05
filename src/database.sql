CREATE TABLE public.users
(
    id integer NOT NULL DEFAULT nextval('users_id_seq'::regclass),
    "firstName" character varying(100) COLLATE pg_catalog."default",
    "lastName" character varying(100) COLLATE pg_catalog."default",
    email character varying(100) COLLATE pg_catalog."default" NOT NULL,
    password character varying(100) COLLATE pg_catalog."default" NOT NULL,
    role character varying(50) COLLATE pg_catalog."default",
    CONSTRAINT users_pkey PRIMARY KEY (id),
    CONSTRAINT users_email_key UNIQUE (email)
)


CREATE TABLE public.mentors
(
    id integer NOT NULL DEFAULT nextval('mentors_id_seq1'::regclass),
    userid integer,
    avatar character varying(255) COLLATE pg_catalog."default",
    field character varying(100) COLLATE pg_catalog."default",
    phone character varying(20) COLLATE pg_catalog."default",
    linkedin character varying(255) COLLATE pg_catalog."default",
    github character varying(255) COLLATE pg_catalog."default",
    languages character varying(255) COLLATE pg_catalog."default",
    workplace character varying(255) COLLATE pg_catalog."default",
    linktoschedule character varying(255) COLLATE pg_catalog."default",
    fullname character varying(100) COLLATE pg_catalog."default",
    CONSTRAINT mentors_pkey PRIMARY KEY (id),
    CONSTRAINT mentors_userid_fkey FOREIGN KEY (userid)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)
