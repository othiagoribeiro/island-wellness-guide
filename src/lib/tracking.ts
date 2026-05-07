type TrackEvent =
  | "click_perfil_terapeuta"
  | "click_solicitar_sesion"
  | "click_whatsapp";

export const trackEvent = (event: TrackEvent, payload: Record<string, any> = {}) => {
  const data = {
    event,
    ...payload,
    timestamp: new Date().toISOString()
  };
  // TODO: integrate with analytics provider (PostHog, GA4, etc.)
  console.log("[Tracking]", data);
};
