import { Body, Controller, Get, HttpException, HttpStatus, Post, Put, Request, UseGuards } from "@nestjs/common";
import { ProposalService } from "./proposal.service";
import { CreateProposalDto } from "./dto/createProposal.dto";
import { JwtAuthGuard } from "src/core/auth/guard/jwt-auth.guard";
import { UpdateStatusDto } from "./dto/updateStatus.dto";

@UseGuards(JwtAuthGuard)
@Controller('proposal')
export class ProposalController {
    constructor(
        private service: ProposalService
    ){}

    @Post('send')
    async singUp(@Request() req, @Body() createProposal: CreateProposalDto){
        const responsible = await this.service.createProposal(createProposal)

        if(responsible == null){
            throw new HttpException(`Informação inválida! CPF já foi utilizado em outra conta.`, HttpStatus.CONFLICT)
        }
        
        return {
            message: 'Cadastro realizado.'            
          }
    }

    @Get('all')
    async all(){
        const allProposal = await this.service.getAllProposal()

        if(allProposal == null){
            throw new HttpException(`Não encontramos nenhuma proposta para você!`, HttpStatus.CONFLICT)
        }
        
        return allProposal
    }

    @Get('getAvailable')
    async my(@Request() req){
        const allProposal = await this.service.getMyProposal(req.user.id)

        if(allProposal == null){
            throw new HttpException(`Não encontramos nenhuma proposta para você!`, HttpStatus.CONFLICT)
        }
        
        return allProposal
    }

    @Put('update')
    async updateStatus(@Body() update: UpdateStatusDto){
        const allProposal = await this.service.updateStatus(update)

        if(allProposal == null){
            throw new HttpException(`Não encontramos nenhuma proposta para você!`, HttpStatus.CONFLICT)
        }
        
        return allProposal
    }
}
