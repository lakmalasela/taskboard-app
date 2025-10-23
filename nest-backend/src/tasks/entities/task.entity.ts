import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';

  import { Status } from 'src/shared/enum/status.enum';

  
  @Entity('task')
  export class Task {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    description: string;

    @Column()
    title: string;

    @Column({
      type: "varchar",
      enum: Status,
      default:Status.PENDING
      })
      status: Status;
  

    @CreateDateColumn()  
    created_at: Date;
    
    @UpdateDateColumn()  
    updated_at: Date;



      
      
}
