using FlowState.Application.Auth;
using FlowState.Application.Contracts;
using FlowState.Domain.Contracts.Auth;
using FlowState.Domain.Entities;

namespace FlowState.Application.Services;

public class AuthService : IAuthService
{
    private readonly IUserRepository _userRepository;
    private readonly ITokenGenerator _tokenGenerator;

    public AuthService(IUserRepository userRepository, ITokenGenerator tokenGenerator)
    {
        _userRepository = userRepository;
        _tokenGenerator = tokenGenerator;
    }

    public async Task<UserDto> RegisterAsync(RegisterUserCommand command)
    {
        var existing = await _userRepository.GetByEmailAsync(command.Email);
        if (existing != null) throw new Exception("Email já cadastrado.");

        var passwordHash = BCrypt.Net.BCrypt.HashPassword(command.Password);
        var user = new User(command.Name, command.Email, passwordHash);
        await _userRepository.AddAsync(user);

        var token = _tokenGenerator.GenerateToken(user);
        return new UserDto(user.Id, user.Name, user.Email, token);
    }

    public async Task<UserDto> LoginAsync(LoginUserCommand command)
    {
        var user = await _userRepository.GetByEmailAsync(command.Email);
        if (user == null || !BCrypt.Net.BCrypt.Verify(command.Password, user.PasswordHash))
        {
            throw new UnauthorizedAccessException("Usuário ou senha inválidos.");
        }

        var token = _tokenGenerator.GenerateToken(user);
        return new UserDto(user.Id, user.Name, user.Email, token);
    }
}
