using FlowState.Application.Auth;
using FlowState.Application.Contracts;

namespace FlowState.API.Endpoints
{
    public static class AuthEndpoints
    {
        public static IEndpointRouteBuilder MapAuthEndpoints(this IEndpointRouteBuilder app)
        {
            app.MapPost("/account/register", async (RegisterUserCommand command, IAuthService authService) =>
            {
                var result = await authService.RegisterAsync(command);
                return Results.Ok(result);
            }).AllowAnonymous();

            app.MapPost("/account/login", async (LoginUserCommand command, IAuthService authService) =>
            {
                var result = await authService.LoginAsync(command);
                return Results.Ok(result);
            }).AllowAnonymous();

            return app;
        }
    }

}
