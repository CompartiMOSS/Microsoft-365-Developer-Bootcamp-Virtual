using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Bot.Builder;
using Microsoft.Bot.Builder.AI.QnA;
using Microsoft.Bot.Builder.Integration.AspNet.Core;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using MultiturnQnABot.Bots;
using MultiturnQnABot.Dialogs;

namespace MultiturnQnABot
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Create the Bot Framework Adapter with error handling enabled.
            services.AddSingleton<IBotFrameworkHttpAdapter, AdapterWithErrorHandler>();

            // Create the storage we'll be using for User and Conversation state. (Memory is great for testing purposes.)
            services.AddSingleton<IStorage, MemoryStorage>();

            // Create the Conversation state. (Used by the Dialog system itself.)
            services.AddSingleton<ConversationState>();

            // Add all Dialogs we are gonna use
            services.AddSingleton<QnAMakerBaseDialog>();

            // Create the bot as a transient. In this case the ASP Controller is expecting an IBot.
            services.AddTransient<IBot, Bot<QnAMakerBaseDialog>>();

            // Add QnA Service
            services.AddQnAService(setup =>
            {
                var qnAMakerEndpoint = Configuration
                    .GetSection("QnAMakerEndpoint").Get<QnAMakerEndpoint>();

                setup.EndpointKey = qnAMakerEndpoint.EndpointKey;
                setup.Host = qnAMakerEndpoint.Host;
                setup.KnowledgeBaseId = qnAMakerEndpoint.KnowledgeBaseId;
            });


        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            app.UseDefaultFiles()
                .UseStaticFiles()
                .UseRouting()
                .UseEndpoints(endpoints =>
            {
                endpoints.Map("api/messages", async context =>
                {
                    var bot = context.RequestServices.GetRequiredService<IBot>();
                    var adapter = context.RequestServices.GetRequiredService<IBotFrameworkHttpAdapter>();

                    await adapter.ProcessAsync(context.Request, context.Response, bot);
                });
            });
        }
    }
}
