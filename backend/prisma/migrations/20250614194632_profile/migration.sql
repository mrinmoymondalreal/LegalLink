-- CreateEnum
CREATE TYPE "Specialization" AS ENUM ('CRIMINAL', 'CIVIL', 'CORPORATE', 'FAMILY', 'CYBER', 'INTELLECTUAL_PROPERTY', 'TAXATION', 'LABOR', 'ENVIRONMENT', 'HUMAN_RIGHTS', 'OTHER');

-- CreateTable
CREATE TABLE "profile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "bio" TEXT,
    "location" TEXT,
    "city" TEXT,
    "district" TEXT,
    "state" TEXT,
    "profile_image" TEXT,
    "user_type" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "advocates" (
    "advocate_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "registration_number" TEXT NOT NULL,
    "reference_number" TEXT NOT NULL,
    "verification_document_url" TEXT NOT NULL,
    "contact_email" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "qualification" TEXT NOT NULL,
    "experience_years" INTEGER NOT NULL,
    "profile_photo_url" TEXT NOT NULL,
    "availability_status" BOOLEAN NOT NULL,
    "language_preferences" TEXT[],
    "location_city" TEXT NOT NULL,
    "jurisdiction_states" TEXT[],
    "fee_structure" JSONB NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "advocates_pkey" PRIMARY KEY ("advocate_id")
);

-- CreateTable
CREATE TABLE "advocate_specializations" (
    "id" UUID NOT NULL,
    "advocate_id" UUID NOT NULL,
    "specialization" "Specialization" NOT NULL,

    CONSTRAINT "advocate_specializations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "advocate_ratings" (
    "rating_id" UUID NOT NULL,
    "advocate_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "stars" INTEGER NOT NULL,
    "feedback" TEXT NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "advocate_ratings_pkey" PRIMARY KEY ("rating_id")
);

-- CreateTable
CREATE TABLE "jurisdictions" (
    "jurisdiction_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "state_name" TEXT NOT NULL,
    "bench" TEXT,

    CONSTRAINT "jurisdictions_pkey" PRIMARY KEY ("jurisdiction_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "profile_userId_key" ON "profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "advocates_userId_key" ON "advocates"("userId");

-- AddForeignKey
ALTER TABLE "profile" ADD CONSTRAINT "profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "advocates" ADD CONSTRAINT "advocates_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "advocate_specializations" ADD CONSTRAINT "advocate_specializations_advocate_id_fkey" FOREIGN KEY ("advocate_id") REFERENCES "advocates"("advocate_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "advocate_ratings" ADD CONSTRAINT "advocate_ratings_advocate_id_fkey" FOREIGN KEY ("advocate_id") REFERENCES "advocates"("advocate_id") ON DELETE RESTRICT ON UPDATE CASCADE;
