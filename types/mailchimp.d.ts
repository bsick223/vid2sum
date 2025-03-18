declare module "@mailchimp/mailchimp_marketing" {
  interface Campaign {
    id: string;
  }

  interface Mailchimp {
    setConfig(config: { apiKey: string; server: string }): void;
    lists: {
      addListMember(listId: string, data: any): Promise<any>;
    };
    campaigns: {
      create(data: any): Promise<Campaign>;
      send(campaignId: string): Promise<any>;
    };
  }

  const mailchimp: Mailchimp;
  export default mailchimp;
}
