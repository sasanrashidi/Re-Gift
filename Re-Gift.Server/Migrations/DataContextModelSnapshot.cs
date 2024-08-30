﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Re_Gift.Server.Data;

#nullable disable

namespace Re_Gift.Server.Migrations
{
    [DbContext(typeof(DataContext))]
    partial class DataContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.8")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("Re_Gift.Server.Models.Giftcard", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<decimal>("Balance")
                        .HasColumnType("decimal(18,2)");

                    b.Property<string>("Company")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("ExpireDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("RegistrationDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("SerialNumber")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("TradeId")
                        .HasColumnType("int");

                    b.Property<int?>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("TradeId");

                    b.HasIndex("UserId");

                    b.ToTable("Giftcards", (string)null);
                });

            modelBuilder.Entity("Re_Gift.Server.Models.Trade", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("TransactionDate")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.ToTable("Trades", (string)null);
                });

            modelBuilder.Entity("Re_Gift.Server.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("TradeId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("TradeId");

                    b.ToTable("Users", (string)null);
                });

            modelBuilder.Entity("Re_Gift.Server.Models.Giftcard", b =>
                {
                    b.HasOne("Re_Gift.Server.Models.Trade", null)
                        .WithMany("Giftcards")
                        .HasForeignKey("TradeId");

                    b.HasOne("Re_Gift.Server.Models.User", "User")
                        .WithMany("Giftcards")
                        .HasForeignKey("UserId");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Re_Gift.Server.Models.User", b =>
                {
                    b.HasOne("Re_Gift.Server.Models.Trade", null)
                        .WithMany("Users")
                        .HasForeignKey("TradeId");
                });

            modelBuilder.Entity("Re_Gift.Server.Models.Trade", b =>
                {
                    b.Navigation("Giftcards");

                    b.Navigation("Users");
                });

            modelBuilder.Entity("Re_Gift.Server.Models.User", b =>
                {
                    b.Navigation("Giftcards");
                });
#pragma warning restore 612, 618
        }
    }
}
