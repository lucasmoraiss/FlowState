namespace FlowState.Application.Auth;

public record RegisterUserCommand(string Name, string Email, string Password);
public record LoginUserCommand(string Email, string Password);
public record UserDto(Guid Id, string Name, string Email, string Token);
