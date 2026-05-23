SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- \restrict LRBaSu7ysMwIywaUjPmt0KM4BKlmFmTnjTbCARNATjlygBRXpaChCtjyMn0CQwY

-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."audit_log_entries" ("instance_id", "id", "payload", "created_at", "ip_address") FROM stdin;
\.


--
-- Data for Name: custom_oauth_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."custom_oauth_providers" ("id", "provider_type", "identifier", "name", "client_id", "client_secret", "acceptable_client_ids", "scopes", "pkce_enabled", "attribute_mapping", "authorization_params", "enabled", "email_optional", "issuer", "discovery_url", "skip_nonce_check", "cached_discovery", "discovery_cached_at", "authorization_url", "token_url", "userinfo_url", "jwks_uri", "created_at", "updated_at") FROM stdin;
\.


--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."flow_state" ("id", "user_id", "auth_code", "code_challenge_method", "code_challenge", "provider_type", "provider_access_token", "provider_refresh_token", "created_at", "updated_at", "authentication_method", "auth_code_issued_at", "invite_token", "referrer", "oauth_client_state_id", "linking_target_id", "email_optional") FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user", "deleted_at", "is_anonymous") FROM stdin;
\.


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."identities" ("provider_id", "user_id", "identity_data", "provider", "last_sign_in_at", "created_at", "updated_at", "id") FROM stdin;
\.


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."instances" ("id", "uuid", "raw_base_config", "created_at", "updated_at") FROM stdin;
\.


--
-- Data for Name: oauth_clients; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."oauth_clients" ("id", "client_secret_hash", "registration_type", "redirect_uris", "grant_types", "client_name", "client_uri", "logo_uri", "created_at", "updated_at", "deleted_at", "client_type", "token_endpoint_auth_method") FROM stdin;
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."sessions" ("id", "user_id", "created_at", "updated_at", "factor_id", "aal", "not_after", "refreshed_at", "user_agent", "ip", "tag", "oauth_client_id", "refresh_token_hmac_key", "refresh_token_counter", "scopes") FROM stdin;
\.


--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."mfa_amr_claims" ("session_id", "created_at", "updated_at", "authentication_method", "id") FROM stdin;
\.


--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."mfa_factors" ("id", "user_id", "friendly_name", "factor_type", "status", "created_at", "updated_at", "secret", "phone", "last_challenged_at", "web_authn_credential", "web_authn_aaguid", "last_webauthn_challenge_data") FROM stdin;
\.


--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."mfa_challenges" ("id", "factor_id", "created_at", "verified_at", "ip_address", "otp_code", "web_authn_session_data") FROM stdin;
\.


--
-- Data for Name: oauth_authorizations; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."oauth_authorizations" ("id", "authorization_id", "client_id", "user_id", "redirect_uri", "scope", "state", "resource", "code_challenge", "code_challenge_method", "response_type", "status", "authorization_code", "created_at", "expires_at", "approved_at", "nonce") FROM stdin;
\.


--
-- Data for Name: oauth_client_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."oauth_client_states" ("id", "provider_type", "code_verifier", "created_at") FROM stdin;
\.


--
-- Data for Name: oauth_consents; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."oauth_consents" ("id", "user_id", "client_id", "scopes", "granted_at", "revoked_at") FROM stdin;
\.


--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."one_time_tokens" ("id", "user_id", "token_type", "token_hash", "relates_to", "created_at", "updated_at") FROM stdin;
\.


--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."refresh_tokens" ("instance_id", "id", "token", "user_id", "revoked", "created_at", "updated_at", "parent", "session_id") FROM stdin;
\.


--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."sso_providers" ("id", "resource_id", "created_at", "updated_at", "disabled") FROM stdin;
\.


--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."saml_providers" ("id", "sso_provider_id", "entity_id", "metadata_xml", "metadata_url", "attribute_mapping", "created_at", "updated_at", "name_id_format") FROM stdin;
\.


--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."saml_relay_states" ("id", "sso_provider_id", "request_id", "for_email", "redirect_to", "created_at", "updated_at", "flow_state_id") FROM stdin;
\.


--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."sso_domains" ("id", "sso_provider_id", "domain", "created_at", "updated_at") FROM stdin;
\.


--
-- Data for Name: webauthn_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."webauthn_challenges" ("id", "user_id", "challenge_type", "session_data", "created_at", "expires_at") FROM stdin;
\.


--
-- Data for Name: webauthn_credentials; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."webauthn_credentials" ("id", "user_id", "credential_id", "public_key", "attestation_type", "aaguid", "sign_count", "transports", "backup_eligible", "backed_up", "friendly_name", "created_at", "updated_at", "last_used_at") FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."users" ("id", "email", "password", "name", "telegramId", "telegramLinkToken", "telegramLinkExpiry", "nlModeEnabled", "createdAt", "updatedAt") FROM stdin;
4ec819d2-fc94-4d32-94c6-9666218d195c	user@example.com	$2b$10$fRpyX8fzN067Kf6borf.neS90dyCAA2bjfF.ret2uwWlvtlCsf75C	Default User	\N	\N	\N	f	2026-05-19 15:42:30.475	2026-05-19 15:42:30.475
b49ab82e-681f-42ec-bd51-15a612c5000c	rifkimubarok1410@gmail.com	$2b$10$tHctz3RJp7grPshIA/BFouQgtE1kNXyqv1wM6xhA/neaSpLUFmOSe	Rifki Mubarok	\N	\N	\N	f	2026-05-19 15:36:24.341	2026-05-21 19:26:43.251
\.


--
-- Data for Name: accounts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."accounts" ("id", "userId", "name", "type", "initialBalance", "currentBalance", "currency", "status", "createdAt", "updatedAt") FROM stdin;
d393d603-8466-44f5-86dc-838540148cec	b49ab82e-681f-42ec-bd51-15a612c5000c	BCA	BANK	6708385.00	6708385.00	IDR	ACTIVE	2026-05-19 15:37:21.394	2026-05-19 15:37:21.394
02ed3f16-aaa1-4965-9e80-fa2c6b6c1184	b49ab82e-681f-42ec-bd51-15a612c5000c	SEABANK	BANK	5223.00	5223.00	IDR	ACTIVE	2026-05-19 15:38:43.586	2026-05-19 15:38:43.586
ada9ee49-0ac6-4e8f-8701-e8c0f9128d8c	b49ab82e-681f-42ec-bd51-15a612c5000c	BLU	BANK	723935.00	723935.00	IDR	ACTIVE	2026-05-19 15:39:34.102	2026-05-19 15:39:34.102
673f64f2-bacb-4c6e-84ed-d5dd4f35a48f	b49ab82e-681f-42ec-bd51-15a612c5000c	JAGO - Tabungan Liburan	BANK	1997392.00	1997392.00	IDR	ACTIVE	2026-05-19 15:40:31.77	2026-05-19 15:40:31.77
5838a288-f779-4ca8-86fa-e899625658b1	b49ab82e-681f-42ec-bd51-15a612c5000c	JAGO - Tabungan HP	BANK	2624242.00	2624242.00	IDR	ACTIVE	2026-05-19 15:40:50.713	2026-05-19 15:40:50.713
13f02f5d-31cd-4a06-8554-8208d15ebfb8	b49ab82e-681f-42ec-bd51-15a612c5000c	JAGO - Aqiqah	BANK	6264250.00	6264250.00	IDR	ACTIVE	2026-05-19 15:41:18.376	2026-05-19 15:41:18.376
b04c7cea-c862-4b4f-9e67-10e719960b79	b49ab82e-681f-42ec-bd51-15a612c5000c	JAGO - Perjadin	BANK	767915.00	767915.00	IDR	ACTIVE	2026-05-19 15:41:35.035	2026-05-19 15:41:35.035
8bab5aac-85b1-4119-92c8-b1dd3272fdfd	b49ab82e-681f-42ec-bd51-15a612c5000c	CASH	CASH	250000.00	170000.00	IDR	ACTIVE	2026-05-20 14:34:15.174	2026-05-23 03:54:39.513
758710cd-da67-48d0-8a7b-31e07790e442	b49ab82e-681f-42ec-bd51-15a612c5000c	BRI	BANK	8012697.00	7801697.00	IDR	ACTIVE	2026-05-19 15:37:54.195	2026-05-20 14:36:23.345
a74d6d72-b70d-4e30-898d-cf7b79a40c5b	b49ab82e-681f-42ec-bd51-15a612c5000c	GOPAY	EWALLET	71480.00	36580.00	IDR	ACTIVE	2026-05-19 15:38:16.302	2026-05-21 00:08:03.049
3c7f84d9-3474-423d-9d62-9d65a16fe1de	b49ab82e-681f-42ec-bd51-15a612c5000c	JAGO - Tabungan Mobil	BANK	5992912.00	5992912.00	IDR	ACTIVE	2026-05-19 15:41:56.114	2026-05-21 16:43:17.512
7f25b9e1-ce0b-45b5-bab7-664c20e87c78	b49ab82e-681f-42ec-bd51-15a612c5000c	JAGO - Utama	BANK	1898270.00	1798070.00	IDR	ACTIVE	2026-05-19 15:40:10.813	2026-05-22 07:46:31.914
792a5125-673f-4e9f-a84c-4b5a153616fe	b49ab82e-681f-42ec-bd51-15a612c5000c	Cash Transit	CASH	0.00	2497000.00	IDR	ACTIVE	2026-05-21 18:35:29.222	2026-05-23 03:51:33.534
\.


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."categories" ("id", "userId", "name", "transactionType", "icon", "color", "isDefault", "status", "createdAt", "updatedAt") FROM stdin;
1cfc76f1-f7ce-4a84-892e-70dd52e4224f	\N	Makanan & Minuman	EXPENSE	restaurant	#FF6B6B	t	ACTIVE	2026-05-19 15:42:30.811	2026-05-19 15:42:30.811
fd609950-e631-4238-9db6-6199fd140000	\N	Transportasi	EXPENSE	directions_car	#FF9F43	t	ACTIVE	2026-05-19 15:42:30.911	2026-05-19 15:42:30.911
21aec9c7-ce59-4d56-a1fe-49f1a0091b7c	\N	Belanja	EXPENSE	shopping_bag	#F368E0	t	ACTIVE	2026-05-19 15:42:31.006	2026-05-19 15:42:31.006
3937606c-f285-4c43-b681-5be9050f6444	\N	Tagihan	EXPENSE	receipt	#EE5A24	t	ACTIVE	2026-05-19 15:42:31.1	2026-05-19 15:42:31.1
51556e42-8413-44c5-aa58-567f72522779	\N	Hiburan	EXPENSE	movie	#A55EEA	t	ACTIVE	2026-05-19 15:42:31.193	2026-05-19 15:42:31.193
02c92226-f5c5-412c-969f-840f8f16d9a9	\N	Kesehatan	EXPENSE	medical_services	#45AAF2	t	ACTIVE	2026-05-19 15:42:31.332	2026-05-19 15:42:31.332
09969941-d34c-4083-b765-bbf99ff48d4f	\N	Pendidikan	EXPENSE	school	#2BCBBA	t	ACTIVE	2026-05-19 15:42:31.426	2026-05-19 15:42:31.426
0de42166-6139-43ee-abdb-59d0d0a63a81	\N	Rumah Tangga	EXPENSE	home	#778CA3	t	ACTIVE	2026-05-19 15:42:31.52	2026-05-19 15:42:31.52
9c623882-6097-4e7e-bdeb-8872a6fffb07	\N	Donasi	EXPENSE	volunteer_activism	#FD9644	t	ACTIVE	2026-05-19 15:42:31.614	2026-05-19 15:42:31.614
ce809199-e4a0-4f5f-93be-b2436f7b2d6a	\N	Lainnya	EXPENSE	more_horiz	#A5B1C2	t	ACTIVE	2026-05-19 15:42:31.706	2026-05-19 15:42:31.706
dad46400-b68f-4deb-b9e1-ce1d9579d092	\N	Gaji	INCOME	payments	#26DE81	t	ACTIVE	2026-05-19 15:42:31.857	2026-05-19 15:42:31.857
a2959d21-9f66-4198-8a17-f50ff9affb61	\N	Bonus	INCOME	card_giftcard	#20BF6B	t	ACTIVE	2026-05-19 15:42:31.949	2026-05-19 15:42:31.949
ad91838c-0d95-4e05-b7d1-92a9f9b6b302	\N	Freelance	INCOME	work	#45AAF2	t	ACTIVE	2026-05-19 15:42:32.04	2026-05-19 15:42:32.04
e77980ea-40f3-4468-babf-3d00dd4ee61b	\N	Hadiah	INCOME	redeem	#FD9644	t	ACTIVE	2026-05-19 15:42:32.13	2026-05-19 15:42:32.13
3eb907c6-2cd7-4316-9a4d-fdae6d5bbcf8	\N	Penjualan	INCOME	storefront	#4B7BEC	t	ACTIVE	2026-05-19 15:42:32.22	2026-05-19 15:42:32.22
6e3ead9b-3df8-4f7c-929f-3b444a026dfd	\N	Cashback	INCOME	savings	#2BCBBA	t	ACTIVE	2026-05-19 15:42:32.379	2026-05-19 15:42:32.379
7a12ae59-7ea5-480f-aa94-3ce058174d12	\N	Lainnya	INCOME	more_horiz	#A5B1C2	t	ACTIVE	2026-05-19 15:42:32.471	2026-05-19 15:42:32.471
98be6c28-96e1-48e8-b200-c13bd5c3e9cf	b49ab82e-681f-42ec-bd51-15a612c5000c	Topup	EXPENSE	\N	#ff8648	f	ACTIVE	2026-05-20 11:26:56.458	2026-05-20 11:26:56.458
\.


--
-- Data for Name: transactions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."transactions" ("id", "userId", "type", "transactionDate", "amount", "feeAmount", "sourceAccountId", "destinationAccountId", "categoryId", "note", "createdAt", "updatedAt") FROM stdin;
f4e50a27-adf1-4459-97af-14ae40ffc31d	b49ab82e-681f-42ec-bd51-15a612c5000c	EXPENSE	2026-05-20 11:22:00	143500.00	\N	758710cd-da67-48d0-8a7b-31e07790e442	\N	fd609950-e631-4238-9db6-6199fd140000	Grab	2026-05-20 11:23:32.127	2026-05-20 11:23:32.127
581eb757-3895-4fad-b0d1-c9d8224018b3	b49ab82e-681f-42ec-bd51-15a612c5000c	EXPENSE	2026-05-20 11:26:00	50000.00	\N	758710cd-da67-48d0-8a7b-31e07790e442	\N	98be6c28-96e1-48e8-b200-c13bd5c3e9cf	Topup brizzi	2026-05-20 11:27:24.744	2026-05-20 11:27:24.744
48454207-f4f1-4bd8-bf18-96abad0f55b0	b49ab82e-681f-42ec-bd51-15a612c5000c	EXPENSE	2026-05-20 14:18:00	27500.00	\N	758710cd-da67-48d0-8a7b-31e07790e442	\N	fd609950-e631-4238-9db6-6199fd140000	\N	2026-05-20 14:19:23.033	2026-05-20 14:19:23.033
51290c64-fd12-4856-85f6-774330794d9d	b49ab82e-681f-42ec-bd51-15a612c5000c	EXPENSE	2026-05-20 14:34:00	35000.00	\N	8bab5aac-85b1-4119-92c8-b1dd3272fdfd	\N	fd609950-e631-4238-9db6-6199fd140000	Bus primajasa	2026-05-20 14:35:42.753	2026-05-20 14:35:42.753
7e4aec7d-0ae1-4261-b468-2e18b30b72c0	b49ab82e-681f-42ec-bd51-15a612c5000c	INCOME	2026-05-20 14:35:00	10000.00	\N	\N	758710cd-da67-48d0-8a7b-31e07790e442	6e3ead9b-3df8-4f7c-929f-3b444a026dfd	Refund menautakn debit	2026-05-20 14:36:23.5	2026-05-20 14:36:23.5
d65514ce-6b5c-453a-80db-8225d8a49ba8	b49ab82e-681f-42ec-bd51-15a612c5000c	EXPENSE	2026-05-21 00:07:00	34900.00	\N	a74d6d72-b70d-4e30-898d-cf7b79a40c5b	\N	21aec9c7-ce59-4d56-a1fe-49f1a0091b7c	Gojek plus	2026-05-21 00:08:03.223	2026-05-21 00:08:03.223
d8224861-71e1-42cc-acb7-146ce8eccbef	b49ab82e-681f-42ec-bd51-15a612c5000c	EXPENSE	2026-05-21 00:08:00	27000.00	\N	8bab5aac-85b1-4119-92c8-b1dd3272fdfd	\N	21aec9c7-ce59-4d56-a1fe-49f1a0091b7c	Ayam + ati	2026-05-21 00:08:39.019	2026-05-21 00:08:39.019
d608f429-c78e-4e77-b755-272a6bd1a26c	b49ab82e-681f-42ec-bd51-15a612c5000c	INCOME	2026-05-21 00:08:00	125000.00	\N	\N	8bab5aac-85b1-4119-92c8-b1dd3272fdfd	7a12ae59-7ea5-480f-aa94-3ce058174d12	Dari pak kiki uang transport	2026-05-21 00:09:30.069	2026-05-21 00:09:30.069
43e3f6b8-b323-4e9d-a7c3-0253194ab949	b49ab82e-681f-42ec-bd51-15a612c5000c	EXPENSE	2026-05-21 01:55:00	452000.00	\N	792a5125-673f-4e9f-a84c-4b5a153616fe	\N	21aec9c7-ce59-4d56-a1fe-49f1a0091b7c	Dana talang cat mamah dede	2026-05-21 18:45:32.881	2026-05-21 18:45:32.881
9503b738-fd3a-4190-b9fc-d0d3cdc88687	b49ab82e-681f-42ec-bd51-15a612c5000c	INCOME	2026-05-20 11:30:00	2954000.00	\N	\N	792a5125-673f-4e9f-a84c-4b5a153616fe	dad46400-b68f-4deb-b9e1-ce1d9579d092	honor paud + transport	2026-05-21 18:44:28.192	2026-05-21 18:46:11.118
80e77011-bfd3-4dd7-b694-08d7f58f80d3	b49ab82e-681f-42ec-bd51-15a612c5000c	EXPENSE	2026-05-21 03:50:00	28000.00	\N	8bab5aac-85b1-4119-92c8-b1dd3272fdfd	\N	1cfc76f1-f7ce-4a84-892e-70dd52e4224f	xiomay	2026-05-21 22:42:50.589	2026-05-21 22:42:50.589
87f93ce1-9695-446b-b592-89947ac0f7b4	b49ab82e-681f-42ec-bd51-15a612c5000c	EXPENSE	2026-05-21 22:42:54.434	14000.00	\N	8bab5aac-85b1-4119-92c8-b1dd3272fdfd	\N	1cfc76f1-f7ce-4a84-892e-70dd52e4224f	surundeng ayam 2	2026-05-21 22:43:24.64	2026-05-21 22:43:24.64
9400c7e9-f75c-4cdc-aad4-d6cd366d91f1	b49ab82e-681f-42ec-bd51-15a612c5000c	EXPENSE	2026-05-22 07:46:09.406	100200.00	\N	7f25b9e1-ce0b-45b5-bab7-664c20e87c78	\N	1cfc76f1-f7ce-4a84-892e-70dd52e4224f	Lazatto	2026-05-22 07:46:32.089	2026-05-22 07:46:32.089
ce62501d-d728-435e-8416-53a81d7f9b18	b49ab82e-681f-42ec-bd51-15a612c5000c	EXPENSE	2026-05-22 12:47:13.004	16500.00	\N	8bab5aac-85b1-4119-92c8-b1dd3272fdfd	\N	21aec9c7-ce59-4d56-a1fe-49f1a0091b7c	pensil + kertas kado	2026-05-22 12:47:52.707	2026-05-22 12:47:52.707
ec80156e-6570-44d0-9401-e4064850a65b	b49ab82e-681f-42ec-bd51-15a612c5000c	EXPENSE	2026-05-22 12:47:54.461	30000.00	\N	8bab5aac-85b1-4119-92c8-b1dd3272fdfd	\N	1cfc76f1-f7ce-4a84-892e-70dd52e4224f	indonaret cimory	2026-05-22 12:48:12.904	2026-05-22 12:48:12.904
db1f6bef-5aa4-463a-a08d-a006f6776f5d	b49ab82e-681f-42ec-bd51-15a612c5000c	EXPENSE	2026-05-23 03:51:03.86	5000.00	\N	792a5125-673f-4e9f-a84c-4b5a153616fe	\N	1cfc76f1-f7ce-4a84-892e-70dd52e4224f	\N	2026-05-23 03:51:33.705	2026-05-23 03:51:33.705
87c62bfe-bfe1-43e5-888a-e1aeca527bdc	b49ab82e-681f-42ec-bd51-15a612c5000c	EXPENSE	2026-05-23 03:52:22.105	100000.00	\N	8bab5aac-85b1-4119-92c8-b1dd3272fdfd	\N	ce809199-e4a0-4f5f-93be-b2436f7b2d6a	nyecep de affi	2026-05-23 03:52:38.466	2026-05-23 03:52:38.466
b72b6edd-4423-4478-b3a0-f9bbf258f6fb	b49ab82e-681f-42ec-bd51-15a612c5000c	EXPENSE	2026-05-23 03:52:12.861	30000.00	\N	8bab5aac-85b1-4119-92c8-b1dd3272fdfd	\N	21aec9c7-ce59-4d56-a1fe-49f1a0091b7c	\N	2026-05-23 03:52:19.948	2026-05-23 03:53:00.378
1e3ba14c-8fa3-4f85-9c36-108255ef7395	b49ab82e-681f-42ec-bd51-15a612c5000c	INCOME	2026-05-23 03:53:58.963	75500.00	\N	\N	8bab5aac-85b1-4119-92c8-b1dd3272fdfd	7a12ae59-7ea5-480f-aa94-3ce058174d12	penyesuaian	2026-05-23 03:54:39.668	2026-05-23 03:54:39.668
\.


--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY "storage"."buckets" ("id", "name", "owner", "created_at", "updated_at", "public", "avif_autodetection", "file_size_limit", "allowed_mime_types", "owner_id", "type") FROM stdin;
\.


--
-- Data for Name: buckets_analytics; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY "storage"."buckets_analytics" ("name", "type", "format", "created_at", "updated_at", "id", "deleted_at") FROM stdin;
\.


--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY "storage"."objects" ("id", "bucket_id", "name", "owner", "created_at", "updated_at", "last_accessed_at", "metadata", "version", "owner_id", "user_metadata") FROM stdin;
\.


--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY "storage"."s3_multipart_uploads" ("id", "in_progress_size", "upload_signature", "bucket_id", "key", "version", "owner_id", "created_at", "user_metadata", "metadata") FROM stdin;
\.


--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY "storage"."s3_multipart_uploads_parts" ("id", "upload_id", "size", "part_number", "bucket_id", "key", "etag", "owner_id", "version", "created_at") FROM stdin;
\.


--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 1, false);


--
-- PostgreSQL database dump complete
--

-- \unrestrict LRBaSu7ysMwIywaUjPmt0KM4BKlmFmTnjTbCARNATjlygBRXpaChCtjyMn0CQwY

RESET ALL;
