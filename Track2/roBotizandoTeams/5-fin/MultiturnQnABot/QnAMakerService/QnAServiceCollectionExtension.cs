using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Bot.Builder.AI.QnA;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Microsoft.Extensions.Configuration
{
    public static class QnAServiceCollectionExtension
    {
        public static IServiceCollection AddQnAService(this IServiceCollection services, Action<QnAMakerEndpoint> setup)
        {
            var qnAMakerEndpoint = new QnAMakerEndpoint();
            setup(qnAMakerEndpoint);

            services.TryAddSingleton<QnAMakerEndpoint>(qnAMakerEndpoint);
            services.TryAddSingleton<QnAMaker>();

            return services;
        }
    }
}
