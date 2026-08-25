import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_modelling_languages_model_purpose" AS ENUM('understand', 'assess', 'diagnose', 'design', 'realise', 'operate', 'regulate');
  CREATE TYPE "public"."enum_modelling_languages_interrogative_perspective" AS ENUM('what', 'how', 'where', 'who', 'when', 'why');
  CREATE TYPE "public"."enum_modelling_languages_granularity" AS ENUM('coarse', 'medium', 'fine');
  CREATE TYPE "public"."enum_modelling_languages_semantic_precision" AS ENUM('informal', 'semi_formal', 'formal');
  CREATE TYPE "public"."enum_modelling_languages_representation_type" AS ENUM('graphical', 'textual', 'tabular', 'hybrid');
  CREATE TYPE "public"."enum_modelling_languages_representation_freedom" AS ENUM('prescribed', 'partially_prescribed', 'free');
  CREATE TYPE "public"."enum_modelling_languages_definitional_disposition" AS ENUM('intensional', 'extensional', 'both');
  CREATE TYPE "public"."enum_modelling_languages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__modelling_languages_v_version_model_purpose" AS ENUM('understand', 'assess', 'diagnose', 'design', 'realise', 'operate', 'regulate');
  CREATE TYPE "public"."enum__modelling_languages_v_version_interrogative_perspective" AS ENUM('what', 'how', 'where', 'who', 'when', 'why');
  CREATE TYPE "public"."enum__modelling_languages_v_version_granularity" AS ENUM('coarse', 'medium', 'fine');
  CREATE TYPE "public"."enum__modelling_languages_v_version_semantic_precision" AS ENUM('informal', 'semi_formal', 'formal');
  CREATE TYPE "public"."enum__modelling_languages_v_version_representation_type" AS ENUM('graphical', 'textual', 'tabular', 'hybrid');
  CREATE TYPE "public"."enum__modelling_languages_v_version_representation_freedom" AS ENUM('prescribed', 'partially_prescribed', 'free');
  CREATE TYPE "public"."enum__modelling_languages_v_version_definitional_disposition" AS ENUM('intensional', 'extensional', 'both');
  CREATE TYPE "public"."enum__modelling_languages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_tools_license_type" AS ENUM('open_source', 'proprietary', 'freemium', 'academic', 'unknown');
  CREATE TYPE "public"."enum_archimate_mappings_archimate_layer" AS ENUM('strategy', 'business', 'application', 'technology', 'physical', 'implementation');
  CREATE TYPE "public"."enum_archimate_mappings_archimate_aspect" AS ENUM('active_structure', 'behaviour', 'passive_structure', 'motivation');
  CREATE TYPE "public"."enum_archimate_mappings_mapping_type" AS ENUM('direct', 'partial', 'bridging');
  CREATE TYPE "public"."enum_exports_format" AS ENUM('csv', 'json');
  CREATE TYPE "public"."enum_exports_sort_order" AS ENUM('asc', 'desc');
  CREATE TYPE "public"."enum_exports_drafts" AS ENUM('yes', 'no');
  CREATE TYPE "public"."enum_imports_import_mode" AS ENUM('create', 'update', 'upsert');
  CREATE TYPE "public"."enum_imports_status" AS ENUM('pending', 'completed', 'partial', 'failed');
  CREATE TYPE "public"."enum_payload_jobs_log_task_slug" AS ENUM('inline', 'createCollectionExport', 'createCollectionImport');
  CREATE TYPE "public"."enum_payload_jobs_log_state" AS ENUM('failed', 'succeeded');
  CREATE TYPE "public"."enum_payload_jobs_task_slug" AS ENUM('inline', 'createCollectionExport', 'createCollectionImport');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"caption" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_card_url" varchar,
  	"sizes_card_width" numeric,
  	"sizes_card_height" numeric,
  	"sizes_card_mime_type" varchar,
  	"sizes_card_filesize" numeric,
  	"sizes_card_filename" varchar
  );
  
  CREATE TABLE "modelling_languages_model_purpose" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_modelling_languages_model_purpose",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "modelling_languages_interrogative_perspective" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_modelling_languages_interrogative_perspective",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "modelling_languages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"abbreviation" varchar,
  	"year_introduced" numeric,
  	"creators" varchar,
  	"is_standard" boolean DEFAULT false,
  	"standardization_body" varchar,
  	"description" jsonb,
  	"industry_usage" varchar,
  	"planning_perspective" varchar,
  	"granularity" "enum_modelling_languages_granularity",
  	"semantic_precision" "enum_modelling_languages_semantic_precision",
  	"representation_type" "enum_modelling_languages_representation_type",
  	"representation_freedom" "enum_modelling_languages_representation_freedom",
  	"definitional_disposition" "enum_modelling_languages_definitional_disposition",
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_modelling_languages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "modelling_languages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"tools_id" integer
  );
  
  CREATE TABLE "_modelling_languages_v_version_model_purpose" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__modelling_languages_v_version_model_purpose",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_modelling_languages_v_version_interrogative_perspective" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__modelling_languages_v_version_interrogative_perspective",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_modelling_languages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_name" varchar,
  	"version_abbreviation" varchar,
  	"version_year_introduced" numeric,
  	"version_creators" varchar,
  	"version_is_standard" boolean DEFAULT false,
  	"version_standardization_body" varchar,
  	"version_description" jsonb,
  	"version_industry_usage" varchar,
  	"version_planning_perspective" varchar,
  	"version_granularity" "enum__modelling_languages_v_version_granularity",
  	"version_semantic_precision" "enum__modelling_languages_v_version_semantic_precision",
  	"version_representation_type" "enum__modelling_languages_v_version_representation_type",
  	"version_representation_freedom" "enum__modelling_languages_v_version_representation_freedom",
  	"version_definitional_disposition" "enum__modelling_languages_v_version_definitional_disposition",
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__modelling_languages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "_modelling_languages_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"tools_id" integer
  );
  
  CREATE TABLE "model_kinds" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"modelling_language_id" integer NOT NULL,
  	"description" jsonb,
  	"aspects_covered" varchar,
  	"relation_to_other_kinds" varchar,
  	"weltanschauung" jsonb,
  	"notational_conventions" jsonb,
  	"meta_model_description" jsonb,
  	"meta_model_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "model_instances" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"model_kind_id" integer NOT NULL,
  	"image_id" integer NOT NULL,
  	"description" varchar,
  	"source" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "tools" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"description" varchar,
  	"vendor" varchar,
  	"url" varchar,
  	"license_type" "enum_tools_license_type",
  	"tool_purpose" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "archimate_mappings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"model_kind_id" integer NOT NULL,
  	"source_construct" varchar,
  	"archimate_concept" varchar NOT NULL,
  	"archimate_layer" "enum_archimate_mappings_archimate_layer",
  	"archimate_aspect" "enum_archimate_mappings_archimate_aspect",
  	"mapping_type" "enum_archimate_mappings_mapping_type" DEFAULT 'direct' NOT NULL,
  	"bridging_concept" varchar,
  	"mapping_description" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "exports" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"format" "enum_exports_format" DEFAULT 'csv' NOT NULL,
  	"limit" numeric,
  	"page" numeric DEFAULT 1,
  	"sort" varchar,
  	"sort_order" "enum_exports_sort_order",
  	"drafts" "enum_exports_drafts" DEFAULT 'yes',
  	"collection_slug" varchar DEFAULT 'modelling-languages' NOT NULL,
  	"where" jsonb DEFAULT '{}'::jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "exports_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "imports" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"collection_slug" varchar DEFAULT 'modelling-languages' NOT NULL,
  	"import_mode" "enum_imports_import_mode",
  	"match_field" varchar DEFAULT 'id',
  	"status" "enum_imports_status" DEFAULT 'pending',
  	"summary_imported" numeric,
  	"summary_updated" numeric,
  	"summary_total" numeric,
  	"summary_issues" numeric,
  	"summary_issue_details" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_jobs_log" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"executed_at" timestamp(3) with time zone NOT NULL,
  	"completed_at" timestamp(3) with time zone NOT NULL,
  	"task_slug" "enum_payload_jobs_log_task_slug" NOT NULL,
  	"task_i_d" varchar NOT NULL,
  	"input" jsonb,
  	"output" jsonb,
  	"state" "enum_payload_jobs_log_state" NOT NULL,
  	"error" jsonb
  );
  
  CREATE TABLE "payload_jobs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"input" jsonb,
  	"completed_at" timestamp(3) with time zone,
  	"total_tried" numeric DEFAULT 0,
  	"has_error" boolean DEFAULT false,
  	"error" jsonb,
  	"task_slug" "enum_payload_jobs_task_slug",
  	"queue" varchar DEFAULT 'default',
  	"wait_until" timestamp(3) with time zone,
  	"processing" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"modelling_languages_id" integer,
  	"model_kinds_id" integer,
  	"model_instances_id" integer,
  	"tools_id" integer,
  	"archimate_mappings_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "modelling_languages_model_purpose" ADD CONSTRAINT "modelling_languages_model_purpose_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."modelling_languages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "modelling_languages_interrogative_perspective" ADD CONSTRAINT "modelling_languages_interrogative_perspective_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."modelling_languages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "modelling_languages_rels" ADD CONSTRAINT "modelling_languages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."modelling_languages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "modelling_languages_rels" ADD CONSTRAINT "modelling_languages_rels_tools_fk" FOREIGN KEY ("tools_id") REFERENCES "public"."tools"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_modelling_languages_v_version_model_purpose" ADD CONSTRAINT "_modelling_languages_v_version_model_purpose_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_modelling_languages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_modelling_languages_v_version_interrogative_perspective" ADD CONSTRAINT "_modelling_languages_v_version_interrogative_perspective_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_modelling_languages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_modelling_languages_v" ADD CONSTRAINT "_modelling_languages_v_parent_id_modelling_languages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."modelling_languages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_modelling_languages_v_rels" ADD CONSTRAINT "_modelling_languages_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_modelling_languages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_modelling_languages_v_rels" ADD CONSTRAINT "_modelling_languages_v_rels_tools_fk" FOREIGN KEY ("tools_id") REFERENCES "public"."tools"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "model_kinds" ADD CONSTRAINT "model_kinds_modelling_language_id_modelling_languages_id_fk" FOREIGN KEY ("modelling_language_id") REFERENCES "public"."modelling_languages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "model_kinds" ADD CONSTRAINT "model_kinds_meta_model_image_id_media_id_fk" FOREIGN KEY ("meta_model_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "model_instances" ADD CONSTRAINT "model_instances_model_kind_id_model_kinds_id_fk" FOREIGN KEY ("model_kind_id") REFERENCES "public"."model_kinds"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "model_instances" ADD CONSTRAINT "model_instances_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "archimate_mappings" ADD CONSTRAINT "archimate_mappings_model_kind_id_model_kinds_id_fk" FOREIGN KEY ("model_kind_id") REFERENCES "public"."model_kinds"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "exports_texts" ADD CONSTRAINT "exports_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."exports"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_jobs_log" ADD CONSTRAINT "payload_jobs_log_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."payload_jobs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_modelling_languages_fk" FOREIGN KEY ("modelling_languages_id") REFERENCES "public"."modelling_languages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_model_kinds_fk" FOREIGN KEY ("model_kinds_id") REFERENCES "public"."model_kinds"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_model_instances_fk" FOREIGN KEY ("model_instances_id") REFERENCES "public"."model_instances"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_tools_fk" FOREIGN KEY ("tools_id") REFERENCES "public"."tools"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_archimate_mappings_fk" FOREIGN KEY ("archimate_mappings_id") REFERENCES "public"."archimate_mappings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE INDEX "modelling_languages_model_purpose_order_idx" ON "modelling_languages_model_purpose" USING btree ("order");
  CREATE INDEX "modelling_languages_model_purpose_parent_idx" ON "modelling_languages_model_purpose" USING btree ("parent_id");
  CREATE INDEX "modelling_languages_interrogative_perspective_order_idx" ON "modelling_languages_interrogative_perspective" USING btree ("order");
  CREATE INDEX "modelling_languages_interrogative_perspective_parent_idx" ON "modelling_languages_interrogative_perspective" USING btree ("parent_id");
  CREATE UNIQUE INDEX "modelling_languages_name_idx" ON "modelling_languages" USING btree ("name");
  CREATE INDEX "modelling_languages_updated_at_idx" ON "modelling_languages" USING btree ("updated_at");
  CREATE INDEX "modelling_languages_created_at_idx" ON "modelling_languages" USING btree ("created_at");
  CREATE INDEX "modelling_languages__status_idx" ON "modelling_languages" USING btree ("_status");
  CREATE INDEX "modelling_languages_rels_order_idx" ON "modelling_languages_rels" USING btree ("order");
  CREATE INDEX "modelling_languages_rels_parent_idx" ON "modelling_languages_rels" USING btree ("parent_id");
  CREATE INDEX "modelling_languages_rels_path_idx" ON "modelling_languages_rels" USING btree ("path");
  CREATE INDEX "modelling_languages_rels_tools_id_idx" ON "modelling_languages_rels" USING btree ("tools_id");
  CREATE INDEX "_modelling_languages_v_version_model_purpose_order_idx" ON "_modelling_languages_v_version_model_purpose" USING btree ("order");
  CREATE INDEX "_modelling_languages_v_version_model_purpose_parent_idx" ON "_modelling_languages_v_version_model_purpose" USING btree ("parent_id");
  CREATE INDEX "_modelling_languages_v_version_interrogative_perspective_order_idx" ON "_modelling_languages_v_version_interrogative_perspective" USING btree ("order");
  CREATE INDEX "_modelling_languages_v_version_interrogative_perspective_parent_idx" ON "_modelling_languages_v_version_interrogative_perspective" USING btree ("parent_id");
  CREATE INDEX "_modelling_languages_v_parent_idx" ON "_modelling_languages_v" USING btree ("parent_id");
  CREATE INDEX "_modelling_languages_v_version_version_name_idx" ON "_modelling_languages_v" USING btree ("version_name");
  CREATE INDEX "_modelling_languages_v_version_version_updated_at_idx" ON "_modelling_languages_v" USING btree ("version_updated_at");
  CREATE INDEX "_modelling_languages_v_version_version_created_at_idx" ON "_modelling_languages_v" USING btree ("version_created_at");
  CREATE INDEX "_modelling_languages_v_version_version__status_idx" ON "_modelling_languages_v" USING btree ("version__status");
  CREATE INDEX "_modelling_languages_v_created_at_idx" ON "_modelling_languages_v" USING btree ("created_at");
  CREATE INDEX "_modelling_languages_v_updated_at_idx" ON "_modelling_languages_v" USING btree ("updated_at");
  CREATE INDEX "_modelling_languages_v_latest_idx" ON "_modelling_languages_v" USING btree ("latest");
  CREATE INDEX "_modelling_languages_v_rels_order_idx" ON "_modelling_languages_v_rels" USING btree ("order");
  CREATE INDEX "_modelling_languages_v_rels_parent_idx" ON "_modelling_languages_v_rels" USING btree ("parent_id");
  CREATE INDEX "_modelling_languages_v_rels_path_idx" ON "_modelling_languages_v_rels" USING btree ("path");
  CREATE INDEX "_modelling_languages_v_rels_tools_id_idx" ON "_modelling_languages_v_rels" USING btree ("tools_id");
  CREATE INDEX "model_kinds_modelling_language_idx" ON "model_kinds" USING btree ("modelling_language_id");
  CREATE INDEX "model_kinds_meta_model_image_idx" ON "model_kinds" USING btree ("meta_model_image_id");
  CREATE INDEX "model_kinds_updated_at_idx" ON "model_kinds" USING btree ("updated_at");
  CREATE INDEX "model_kinds_created_at_idx" ON "model_kinds" USING btree ("created_at");
  CREATE INDEX "model_instances_model_kind_idx" ON "model_instances" USING btree ("model_kind_id");
  CREATE INDEX "model_instances_image_idx" ON "model_instances" USING btree ("image_id");
  CREATE INDEX "model_instances_updated_at_idx" ON "model_instances" USING btree ("updated_at");
  CREATE INDEX "model_instances_created_at_idx" ON "model_instances" USING btree ("created_at");
  CREATE INDEX "tools_updated_at_idx" ON "tools" USING btree ("updated_at");
  CREATE INDEX "tools_created_at_idx" ON "tools" USING btree ("created_at");
  CREATE INDEX "archimate_mappings_model_kind_idx" ON "archimate_mappings" USING btree ("model_kind_id");
  CREATE INDEX "archimate_mappings_updated_at_idx" ON "archimate_mappings" USING btree ("updated_at");
  CREATE INDEX "archimate_mappings_created_at_idx" ON "archimate_mappings" USING btree ("created_at");
  CREATE INDEX "exports_updated_at_idx" ON "exports" USING btree ("updated_at");
  CREATE INDEX "exports_created_at_idx" ON "exports" USING btree ("created_at");
  CREATE UNIQUE INDEX "exports_filename_idx" ON "exports" USING btree ("filename");
  CREATE INDEX "exports_texts_order_parent" ON "exports_texts" USING btree ("order","parent_id");
  CREATE INDEX "imports_updated_at_idx" ON "imports" USING btree ("updated_at");
  CREATE INDEX "imports_created_at_idx" ON "imports" USING btree ("created_at");
  CREATE UNIQUE INDEX "imports_filename_idx" ON "imports" USING btree ("filename");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_jobs_log_order_idx" ON "payload_jobs_log" USING btree ("_order");
  CREATE INDEX "payload_jobs_log_parent_id_idx" ON "payload_jobs_log" USING btree ("_parent_id");
  CREATE INDEX "payload_jobs_completed_at_idx" ON "payload_jobs" USING btree ("completed_at");
  CREATE INDEX "payload_jobs_total_tried_idx" ON "payload_jobs" USING btree ("total_tried");
  CREATE INDEX "payload_jobs_has_error_idx" ON "payload_jobs" USING btree ("has_error");
  CREATE INDEX "payload_jobs_task_slug_idx" ON "payload_jobs" USING btree ("task_slug");
  CREATE INDEX "payload_jobs_queue_idx" ON "payload_jobs" USING btree ("queue");
  CREATE INDEX "payload_jobs_wait_until_idx" ON "payload_jobs" USING btree ("wait_until");
  CREATE INDEX "payload_jobs_processing_idx" ON "payload_jobs" USING btree ("processing");
  CREATE INDEX "payload_jobs_updated_at_idx" ON "payload_jobs" USING btree ("updated_at");
  CREATE INDEX "payload_jobs_created_at_idx" ON "payload_jobs" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_modelling_languages_id_idx" ON "payload_locked_documents_rels" USING btree ("modelling_languages_id");
  CREATE INDEX "payload_locked_documents_rels_model_kinds_id_idx" ON "payload_locked_documents_rels" USING btree ("model_kinds_id");
  CREATE INDEX "payload_locked_documents_rels_model_instances_id_idx" ON "payload_locked_documents_rels" USING btree ("model_instances_id");
  CREATE INDEX "payload_locked_documents_rels_tools_id_idx" ON "payload_locked_documents_rels" USING btree ("tools_id");
  CREATE INDEX "payload_locked_documents_rels_archimate_mappings_id_idx" ON "payload_locked_documents_rels" USING btree ("archimate_mappings_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "modelling_languages_model_purpose" CASCADE;
  DROP TABLE "modelling_languages_interrogative_perspective" CASCADE;
  DROP TABLE "modelling_languages" CASCADE;
  DROP TABLE "modelling_languages_rels" CASCADE;
  DROP TABLE "_modelling_languages_v_version_model_purpose" CASCADE;
  DROP TABLE "_modelling_languages_v_version_interrogative_perspective" CASCADE;
  DROP TABLE "_modelling_languages_v" CASCADE;
  DROP TABLE "_modelling_languages_v_rels" CASCADE;
  DROP TABLE "model_kinds" CASCADE;
  DROP TABLE "model_instances" CASCADE;
  DROP TABLE "tools" CASCADE;
  DROP TABLE "archimate_mappings" CASCADE;
  DROP TABLE "exports" CASCADE;
  DROP TABLE "exports_texts" CASCADE;
  DROP TABLE "imports" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_jobs_log" CASCADE;
  DROP TABLE "payload_jobs" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TYPE "public"."enum_modelling_languages_model_purpose";
  DROP TYPE "public"."enum_modelling_languages_interrogative_perspective";
  DROP TYPE "public"."enum_modelling_languages_granularity";
  DROP TYPE "public"."enum_modelling_languages_semantic_precision";
  DROP TYPE "public"."enum_modelling_languages_representation_type";
  DROP TYPE "public"."enum_modelling_languages_representation_freedom";
  DROP TYPE "public"."enum_modelling_languages_definitional_disposition";
  DROP TYPE "public"."enum_modelling_languages_status";
  DROP TYPE "public"."enum__modelling_languages_v_version_model_purpose";
  DROP TYPE "public"."enum__modelling_languages_v_version_interrogative_perspective";
  DROP TYPE "public"."enum__modelling_languages_v_version_granularity";
  DROP TYPE "public"."enum__modelling_languages_v_version_semantic_precision";
  DROP TYPE "public"."enum__modelling_languages_v_version_representation_type";
  DROP TYPE "public"."enum__modelling_languages_v_version_representation_freedom";
  DROP TYPE "public"."enum__modelling_languages_v_version_definitional_disposition";
  DROP TYPE "public"."enum__modelling_languages_v_version_status";
  DROP TYPE "public"."enum_tools_license_type";
  DROP TYPE "public"."enum_archimate_mappings_archimate_layer";
  DROP TYPE "public"."enum_archimate_mappings_archimate_aspect";
  DROP TYPE "public"."enum_archimate_mappings_mapping_type";
  DROP TYPE "public"."enum_exports_format";
  DROP TYPE "public"."enum_exports_sort_order";
  DROP TYPE "public"."enum_exports_drafts";
  DROP TYPE "public"."enum_imports_import_mode";
  DROP TYPE "public"."enum_imports_status";
  DROP TYPE "public"."enum_payload_jobs_log_task_slug";
  DROP TYPE "public"."enum_payload_jobs_log_state";
  DROP TYPE "public"."enum_payload_jobs_task_slug";`)
}
