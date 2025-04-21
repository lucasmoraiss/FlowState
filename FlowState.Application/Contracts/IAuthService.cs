using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FlowState.Application.Auth;

namespace FlowState.Application.Contracts
{
    public interface IAuthService
    {
        Task<UserDto> RegisterAsync(RegisterUserCommand command);
        Task<UserDto> LoginAsync(LoginUserCommand command);
    }
}
