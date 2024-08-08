use anchor_lang::prelude::*;

declare_id!("CNaGveTjTsJ4iWLLMe9gghPoYtEDMsUsJPRosqhQs6RY");

#[program]
pub mod course7 {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
