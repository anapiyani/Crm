import { FC, useState } from 'react'
import CounterCard from '@/components/counter-card/counter-card'
import BreadcrumbsCustom from '@/components/navigation/breadcrumbs/breadcrumbs'
import VerticalTextField from '@/components/textfield-vertical/textfield-vertical'
import { getIndirectCosts } from '@/service/kassa/kassa.service'
import { Add, Edit, ExpandLess, ExpandMore } from '@mui/icons-material'
import {
	Button,
	FormControl,
	FormControlLabel,
	Pagination,
	Radio,
	RadioGroup,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
} from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import classes from './style.module.scss'
import dayjs from 'dayjs'

const IndirectCostsPage: FC = () => {
	const {
		data: indirectCostsData,
		isLoading: indirectCostsLoading,
		isError: indirectCostsError,
	} = useQuery({
		queryKey: ['indirectCosts'],
		queryFn: getIndirectCosts,
	})

	const reportPeriod = () => {
		return (
			indirectCostsData && (
				Number(indirectCostsData.administrative_expenses) + Number(indirectCostsData.expenses_on_checks_cash_register) + Number(indirectCostsData.operational_expenses) + Number(indirectCostsData.production_expenses)
			)
		)
	}

	const [openTables, setOpenTables] = useState<{ [key: string]: boolean }>({
		table1: false,
		table2: false,
		table3: false,
		table4: false,
	})

	const toggleTable = (tableKey: string) => {
		setOpenTables(prevState => ({
			...prevState,
			[tableKey]: !prevState[tableKey],
		}))
	}

	return (
		<div className={classes.main}>
			<div className={classes.main__upper}>
				<BreadcrumbsCustom />
				<div className={classes.main__header}>
					<h1>Косвенные расчеты</h1>
					<div className={classes.main__header__row}>
						<CounterCard
							backgroundColor={'#2196F34D'}
							iconColor={'var(--primary-main)'}
							textTitle={'Разходы за отчетный период'}
							valueText={indirectCostsData ? reportPeriod() : 0}
						/>
						<CounterCard
							backgroundColor={'#2E7D324D'}
							iconColor={'var(--success-main)'}
							textTitle={'Накопленная статистика доходов'}
							valueText={'100 мес.'}
						/>
						<CounterCard
							backgroundColor={'#FCE4E4'}
							iconColor={'#C41C1C'}
							textTitle={'Средняя сумма расходов в месяц'}
							valueText={'1 000 000 руб.'}
						/>
					</div>
				</div>
			</div>

			<div className={classes.main__content}>
				<div className={classes.main__content__control}>
					<div className={classes.main__content__control__item}>
						<label>Создать отчет за</label>

						<FormControl>
							<RadioGroup>
								<FormControlLabel
									sx={{
										padding: '0 10px',
										'& .MuiFormControlLabel-label': {
											fontSize: '1.6rem',
										},
									}}
									value='day'
									control={
										<Radio
											sx={{
												'& .MuiSvgIcon-root': {
													fontSize: 18,
												},
											}}
										/>
									}
									label='День'
								/>
								<FormControlLabel
									sx={{
										padding: '0 10px',
										'& .MuiFormControlLabel-label': {
											fontSize: '1.6rem',
										},
									}}
									value='week'
									control={
										<Radio
											sx={{
												'& .MuiSvgIcon-root': {
													fontSize: 18,
												},
											}}
										/>
									}
									label='Неделя'
								/>
								<FormControlLabel
									sx={{
										padding: '0 10px',
										'& .MuiFormControlLabel-label': {
											fontSize: '1.6rem',
										},
									}}
									value='month'
									control={
										<Radio
											sx={{
												'& .MuiSvgIcon-root': {
													fontSize: 18,
												},
											}}
										/>
									}
									label='Месяц'
								/>
								<FormControlLabel
									sx={{
										padding: '0 10px',
										'& .MuiFormControlLabel-label': {
											fontSize: '1.6rem',
										},
									}}
									value={'quarter'}
									control={
										<Radio
											sx={{
												'& .MuiSvgIcon-root': {
													fontSize: 18,
												},
											}}
										/>
									}
									label={'Квартал'}
								/>
								<FormControlLabel
									sx={{
										padding: '0 10px',
										'& .MuiFormControlLabel-label': {
											fontSize: '1.6rem',
										},
									}}
									value='year'
									control={
										<Radio
											sx={{
												'& .MuiSvgIcon-root': {
													fontSize: 18,
												},
											}}
										/>
									}
									label='Год'
								/>
								<FormControlLabel
									sx={{
										padding: '0 10px',
										'& .MuiFormControlLabel-label': {
											fontSize: '1.6rem',
										},
									}}
									value={'custom'}
									control={
										<Radio
											sx={{
												'& .MuiSvgIcon-root': {
													fontSize: 18,
												},
											}}
										/>
									}
									label={'Заданный период'}
								/>
							</RadioGroup>
							<VerticalTextField
								placeholder={'C'}
								placeholderOptional='По'
								type={'double'}
								doubleDivier='-'
							/>
							<Button variant='contained'>Создать отчет</Button>
							<Button variant='outlined'>Сбросить</Button>
						</FormControl>
					</div>
				</div>
				<div className={classes.main__content__result}>
					<div className={classes.main__content__result__item}>
						<div className={classes.main__content__result__header}>
							<div className={classes.main__content__result__header__row}>
								<label>Июль 2024</label>
								<Pagination
									count={0}
									variant='outlined'
									shape='rounded'
									color='primary'
									sx={{
										'& .MuiPaginationItem-root': {
											fontSize: '2.6rem',
											opacity: 1,
										},
									}}
								/>
							</div>
							<div className={classes.main__content__result__header__row}>
								<Button startIcon={<Edit />} variant='outlined'>
									Редактивровать
								</Button>
								<Button startIcon={<Add />} variant='outlined'>
									Добавить Категорию
								</Button>
							</div>
						</div>
						<div className={classes.main__content__result__wrap}>
							<div
								onClick={() => toggleTable('table1')}
								className={classes.main__content__result__wrap__header}
							>
								<h1>Производственные разходы</h1>

								<div
									style={{
										display: 'flex',
										flexDirection: 'row',
										alignItems: 'center',
									}}
								>
									<h1>-{indirectCostsData?.production_expenses} руб</h1>
									<span style={{ paddingTop: '8px' }}>
										{openTables.table1 ? (
											<ExpandLess style={{ fontSize: '24px' }} />
										) : (
											<ExpandMore style={{ fontSize: '24px' }} />
										)}
									</span>
								</div>
							</div>
							{openTables.table1 && (
								indirectCostsData?.production_expenses && (
									<Table className={classes.table}>
										<TableHead>
											<TableRow>
												<TableCell>Дата</TableCell>
												<TableCell>Тип операции</TableCell>
												<TableCell>Сумма</TableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											{indirectCostsData.production_details.map((item, index) => (
												item.operations.map((operation, index) => (
													<TableRow key={index}>
														<TableCell>{dayjs(operation.date).format("DD.MM.YYYY")}</TableCell>
														<TableCell>{operation.operation_type}</TableCell>
														<TableCell>{operation.total_amount_change}</TableCell>
													</TableRow>
												))
											))}
										</TableBody>
									</Table>
								))
							}
						</div>
						<div className={classes.main__content__result__wrap}>
							<div
								onClick={() => toggleTable('table2')}
								className={classes.main__content__result__wrap__header}
							>
								<h1>Операционные расходы</h1>

								<div
									style={{
										display: 'flex',
										flexDirection: 'row',
										alignItems: 'center',
									}}
								>
									<h1>-{indirectCostsData?.operational_expenses} руб</h1>
									<span style={{ paddingTop: '8px' }}>
										{openTables.table2 ? (
											<ExpandLess style={{ fontSize: '24px' }} />
										) : (
											<ExpandMore style={{ fontSize: '24px' }} />
										)}
									</span>
								</div>
							</div>
							{openTables.table2 && (
								indirectCostsData?.operational_expenses && (
									<Table className={classes.table}>
										<TableHead>
											<TableRow>
												<TableCell>Дата</TableCell>
												<TableCell>Тип операции</TableCell>
												<TableCell>Сумма</TableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											{indirectCostsData.operational_details.map((item, index) => (
												item.operations.map((operation, index) => (
													<TableRow key={index}>
														<TableCell>{dayjs(operation.date).format("DD.MM.YYYY")}</TableCell>
														<TableCell>{operation.operation_type}</TableCell>
														<TableCell>{operation.total_amount_change}</TableCell>
													</TableRow>
												))
											))}
										</TableBody>
									</Table>
								))
							}
						</div>
						<div className={classes.main__content__result__wrap}>
							<div
								onClick={() => toggleTable('table3')}
								className={classes.main__content__result__wrap__header}
							>
								<h1>Административные расходы</h1>

								<div
									style={{
										display: 'flex',
										flexDirection: 'row',
										alignItems: 'center',
									}}
								>
									<h1>-{indirectCostsData?.administrative_expenses} руб</h1>
									<span style={{ paddingTop: '8px' }}>
										{openTables.table3 ? (
											<ExpandLess style={{ fontSize: '24px' }} />
										) : (
											<ExpandMore style={{ fontSize: '24px' }} />
										)}
									</span>
								</div>
							</div>
							{openTables.table3 && (
								indirectCostsData?.administrative_expenses && (
									<Table className={classes.table}>
										<TableHead>
											<TableRow>
												<TableCell>Дата</TableCell>
												<TableCell>Тип операции</TableCell>
												<TableCell>Сумма</TableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											{indirectCostsData.administrative_details.map((item, index) => (
												item.operations.map((operation, index) => (
													<TableRow key={index}>
														<TableCell>{dayjs(operation.date).format("DD.MM.YYYY")}</TableCell>
														<TableCell>{operation.operation_type}</TableCell>
														<TableCell>{operation.total_amount_change}</TableCell>
													</TableRow>
												))
											))}
										</TableBody>
									</Table>
								))
							}
						</div>
						<div className={classes.main__content__result__wrap}>
							<div
								onClick={() => toggleTable('table4')}
								className={classes.main__content__result__wrap__header}
							>
								<h1>Расходы по чекам кассовый аппарат</h1>

								<div
									style={{
										display: 'flex',
										flexDirection: 'row',
										alignItems: 'center',
									}}
								>
									<h1>-{indirectCostsData?.expenses_on_checks_cash_register} руб</h1>
									<span style={{ paddingTop: '8px' }}>
										{openTables.table4 ? (
											<ExpandLess style={{ fontSize: '24px' }} />
										) : (
											<ExpandMore style={{ fontSize: '24px' }} />
										)}
									</span>
								</div>
							</div>
							{openTables.table4 && (
								indirectCostsData?.expenses_on_checks_cash_register && (
									<Table className={classes.table}>
										<TableHead>
											<TableRow>
												<TableCell>Дата</TableCell>
												<TableCell>Тип операции</TableCell>
												<TableCell>Сумма</TableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											{indirectCostsData.checks_cash_register_details.map((item, index) => (
												item.operations.map((operation, index) => (
													<TableRow key={index}>
														<TableCell>{dayjs(operation.date).format("DD.MM.YYYY")}</TableCell>
														<TableCell>{operation.operation_type}</TableCell>
														<TableCell>{operation.total_amount_change}</TableCell>
													</TableRow>
												))
											))}
										</TableBody>
									</Table>
								))
							}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default IndirectCostsPage
