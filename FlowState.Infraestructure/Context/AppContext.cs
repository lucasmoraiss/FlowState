using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Emit;
using System.Text;
using System.Threading.Tasks;
using FlowState.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace FlowState.Infrastructure.Context
{
    public class AppDbContext : DbContext
    {

        public DbSet<User> Users => Set<User>();

        public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            #region User
            modelBuilder.Entity<User>(e =>
            {
                e.HasKey(u => u.Id);
                e.Property(u => u.Name).IsRequired().HasMaxLength(100);
                e.Property(u => u.Email).IsRequired().HasMaxLength(100);
                e.Property(u => u.PasswordHash).IsRequired();
                e.Property(u => u.Role).IsRequired();
            });
            #endregion

        }
    }
}
