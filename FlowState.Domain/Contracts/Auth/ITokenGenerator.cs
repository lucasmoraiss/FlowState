using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FlowState.Domain.Entities;

namespace FlowState.Domain.Contracts.Auth
{
    public interface ITokenGenerator
    {
        string GenerateToken(User user);
    }
}
